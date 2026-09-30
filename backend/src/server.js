import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";
import env from "./config/env.js";

const PORT = env.port || 3000;
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Localhost connected on port:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};
startServer();
