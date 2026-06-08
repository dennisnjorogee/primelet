import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import { appError } from "../../utils/error.js";
export const registrationService = async (registrationData) => {
  /**
   * DEV WORKFLOW NOTES
   * - Check if unique identifiers exist in db
   * - If they exist, throw error
   * - Otherwise create user account and save the data to DB
   * - NOTES: Hash user password,
   * - Send verification token to user via EMAIL
   */
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    // Destructure registrationData
    const { firstName, lastName, emailAddress, phoneNumber, password } =
      registrationData;

    //check emailAddress
    const [emailRows] = await connection.execute(
      `SELECT 1 FROM users WHERE email_address = ?`,
      [emailAddress],
    );

    if (emailRows.length > 0) {
      throw appError("Email address already exists", 409);
    }

    //check phoneNumber
    const [phoneRows] = await connection.execute(
      `SELECT 1 FROM users WHERE phone_number = ?`,
      [phoneNumber],
    );

    if (phoneRows.length > 0) {
      throw appError("Phone number already exists", 409);
    }

    // Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user info in DB
    await connection.execute(
      `INSERT INTO users (first_name, last_name, email_address, phone_number, password_hash) VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, emailAddress, phoneNumber, hashedPassword],
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
