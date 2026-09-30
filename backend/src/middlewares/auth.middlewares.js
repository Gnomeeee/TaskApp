import { AppError } from "../utils/appError.js";
import { verifyToken } from "../utils/token";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    throw new AppError("Not authenticated", 401);

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    throw new AppError("Invalid or token expired", 401);
  }
};
