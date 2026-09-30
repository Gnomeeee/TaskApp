import { AppError } from "../utils/appError.js";

const requiredVars = ["PORT", "DATABASE_URL", "JWT_SECRET", "JWT_EXPIRES_IN"];
const missing = [];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    missing.push(varName);
  }
}

if (missing.length > 0) {
  throw new AppError(`Missing required env var(s): ${missing.join(", ")}`, 404);
}

const env = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

export default env;
