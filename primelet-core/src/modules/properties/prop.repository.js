import pool from "../../config/db.js";
import utils from "../../utils/utils.js";

const fetchAll = async () => {
  const [rows] = await pool.execute(`SELECT * FROM houses`);

  if (rows.length === 0) {
    throw new utils.appError("No properties found", 404);
  }

  return rows;
};

export default { fetchAll };
