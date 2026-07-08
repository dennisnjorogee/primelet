import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";
import utils from "../../utils/utils.js";

const fetchAll = async () => {
  const [rows] = await pool.execute(`SELECT * FROM houses`);

  if (rows.length === 0) {
    throw new AppError("No properties found", 404);
  }

  return rows;
};

const fetchBySlug = async (slug) => {
  const [rows] = await pool.execute(`SELECT * FROM houses WHERE slug = ?`, [
    slug,
  ]);

  if (rows.length === 0) {
    throw new AppError("Property was not found", 404);
  }

  return rows[0];
};

export default { fetchAll, fetchBySlug };
