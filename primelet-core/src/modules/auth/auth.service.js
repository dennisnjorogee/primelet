import bcrypt from "bcrypt";
import crypto from "crypto";
import pool from "../../config/db.js";
import utils from "../../utils/utils.js";
import emailService from "../../services/email.service.js";

const login = async (loginData) => {
  /**
   * LOGIN SERVICE WORKFLOW
   * - check if identifier(emailAddress) exists in db
   * - if emailAddress does not exist, throw an error(unauthorized)
   * -else compare submitted password with stored password(in DB)
   * -if they match, return access token
   * -else throw error
   */

  try {
    //destructure login data
    const { emailAddress, password } = loginData;

    // check if email exists
    const [emailRows] = await pool.execute(
      `SELECT id, password_hash FROM users WHERE email_address = ?`,
      [emailAddress],
    );

    if (emailRows.length === 0) {
      throw utils.appError("Invalid email or password", 401);
    }

    const user = emailRows[0];

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw utils.appError("Invalid email or password", 401);
    }

    // generate JWT access + refresh tokens
    const accessToken = utils.signAccessToken(user.id);
    const refreshToken = utils.signRefreshToken(user.id);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const register = async (registrationData) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    // Destructure registrationData
    const { firstName, lastName, emailAddress, password } = registrationData;

    //check emailAddress
    const [emailRows] = await connection.execute(
      `SELECT 1 FROM users WHERE email_address = ?`,
      [emailAddress],
    );

    if (emailRows.length > 0) {
      throw utils.appError("Email address already exists", 409);
    }

    // Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user info in DB
    const [result] = await connection.execute(
      `INSERT INTO users (first_name, last_name, email_address,  password_hash) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, emailAddress, hashedPassword],
    );

    const userId = result.insertId;

    // verification token
    const { verificationToken, verificationTokenHash, expiresAt } =
      utils.generateVerificationToken();

    await connection.execute(
      `INSERT INTO verification_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)`,
      [userId, verificationTokenHash, expiresAt],
    );

    await connection.commit();

    const registrationToken = utils.signRegistrationToken(userId);

    emailService.verifyEmail(
      emailAddress,
      `${firstName} ${lastName}`,
      verificationToken,
    );

    return registrationToken;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const verifyEmail = async (verificationToken) => {
  const connection = await pool.getConnection();
  try {
    // initialize mysql transaction
    await connection.beginTransaction();

    //hash incoming verification token
    const incomingHash = crypto.hash("sha256", verificationToken, "hex");

    // lookup matching hash in db
    const [tokenRows] = await connection.execute(
      `SELECT user_id, expires_at FROM verification_tokens WHERE token_hash = ?`,
      [incomingHash],
    );

    if (tokenRows.length === 0) {
      throw utils.appError(
        "Invalid or expired verification link. Please request a new one.",
        400,
      );
    }

    const userId = tokenRows[0].user_id;
    const tokenExpiry = tokenRows[0].expires_at;

    // check if token has expired
    if (new Date(tokenExpiry).getTime() < Date.now()) {
      // clean expired token
      await connection.execute(
        `DELETE FROM verification_tokens WHERE user_id = ?`,
        [userId],
      );

      throw utils.appError(
        "Invalid or expired verification link. Please request a new one.",
        400,
      );
    }

    // check if email is already verified
    const [users] = await connection.execute(
      `SELECT email_verified FROM users WHERE id = ?`,
      [userId],
    );

    if (users[0]?.email_verified) {
      return;
    }

    // update verification status
    await connection.execute(
      `UPDATE users SET email_verified = ? WHERE id = ?`,
      [1, userId],
    );

    // delete tokens
    await connection.execute(
      `DELETE FROM verification_tokens WHERE user_id = ?`,
      [userId],
    );

    // commit db transaction
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const resendVerifyEmail = async (userId) => {
  try {
    // collect user email from db
    const [rows] = await pool.execute(
      `SELECT email_address, first_name, last_name, email_verified FROM users WHERE id = ?`,
      [userId],
    );

    if (rows.length === 0) {
      throw utils.appError("User not found", 404);
    }

    const { email_address, first_name, last_name, email_verified } = rows[0];

    if (email_verified === 1) {
      throw utils.appError("Email already verified", 400);
    }

    // get verification token
    const { verificationToken, verificationTokenHash, expiresAt } =
      utils.generateVerificationToken();

    await pool.execute(
      `INSERT INTO verification_tokens (user_id, token_hash, expires_at) 
   VALUES (?, ?, ?) 
   ON DUPLICATE KEY UPDATE token_hash = VALUES(token_hash), expires_at = VALUES(expires_at)`,
      [userId, verificationTokenHash, expiresAt],
    );

    emailService.verifyEmail(
      email_address,
      `${first_name} ${last_name}`,
      verificationToken,
    );
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (emailAddress) => {
  try {
    // check if email exists
    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name FROM users WHERE email_address = ? `,
      [emailAddress],
    );

    // return silently if user not found
    if (rows.length === 0) {
      return;
    }

    // destructure user details
    const { id, first_name, last_name } = rows[0];

    const { resetToken, resetTokenHash, expiresAt } =
      utils.generateResetToken();

    // store resettoken hash in db
    await pool.execute(
      `INSERT INTO reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token_hash = VALUES(token_hash), expires_at = VALUES(expires_at)`,
      [id, resetTokenHash, expiresAt],
    );

    emailService.forgotPassword(
      emailAddress,
      `${first_name} ${last_name}`,
      resetToken,
    );
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (resetToken, password) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // hash incoming reset token
    const incomingTokenHash = crypto.hash("sha256", resetToken, "hex");

    // lookup the token in db
    const [tokenRows] = await connection.execute(
      `SELECT user_id, expires_at FROM reset_tokens WHERE token_hash = ?`,
      [incomingTokenHash],
    );

    if (tokenRows.length === 0) {
      throw utils.appError(
        "Invalid or expired reset link. Please request a new one.",
        400,
      );
    }

    // destructure db response
    const { user_id, expires_at } = tokenRows[0];

    //check if reset token is expired

    if (new Date(expires_at).getTime() < Date.now()) {
      // clean expired token
      await connection.execute(`DELETE FROM reset_tokens WHERE user_id = ?`, [
        user_id,
      ]);

      throw utils.appError(
        "Invalid or expired reset link. Please request a new one.",
        400,
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user password
    await connection.execute(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [hashedPassword, user_id],
    );

    // delete reset token
    await connection.execute(`DELETE FROM reset_tokens WHERE user_id = ?`, [
      user_id,
    ]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  login,
  register,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
};
