import mysql from "mysql2/promise";

const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: process.env.NODE_ENV === "production",
  },
});

export default pool;
