import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";
import utils from "../../utils/utils.js";

const fetchAll = async (filters) => {
  let sql = "SELECT * FROM houses WHERE 1=1";
  const params = [];

  if (filters.minPrice !== undefined) {
    sql += " AND price >= ?";
    params.push(filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    sql += " AND price <= ?";
    params.push(filters.maxPrice);
  }

  if (filters.beds !== undefined) {
    sql += " AND beds = ?";
    params.push(filters.beds);
  }

  if (filters.bath !== undefined) {
    sql += " AND bath = ?";
    params.push(filters.bath);
  }

  if (filters.parking !== undefined) {
    sql += " AND parking = ?";
    params.push(filters.parking);
  }

  if (filters.county) {
    sql += " AND county = ?";
    params.push(filters.county);
  }

  const [rows] = await pool.execute(sql, params);

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

const fetchRandom = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM houses ORDER BY RAND() LIMIT 10",
  );

  return rows;
};

export default { fetchAll, fetchBySlug, fetchRandom };
