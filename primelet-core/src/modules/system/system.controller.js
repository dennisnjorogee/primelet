import pool from "../../config/db.js";

// database connection check
export const dbConnectionCheck = async (req, res) => {
  try {
    await pool.query("SELECT 1");

    return res.status(200).json({
      status: "success",
      message: "Database is reachable",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
};

export const apiHealthCheck = (req, res) => {
  //uptime in seconds
  const totalSeconds = process.uptime();

  //hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

  return res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    serverUptime: uptimeString,
    uptimeInSeconds: totalSeconds,
    memoryUsage: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
    },
  });
};
