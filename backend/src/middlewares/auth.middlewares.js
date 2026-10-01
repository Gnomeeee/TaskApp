import { AppError } from "../utils/appError.js";
import { verifyToken } from "../utils/token.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError("Not authenticated", 401));

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    next(new AppError("Invalid or expired token"), 401);
  }
};
