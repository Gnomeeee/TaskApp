import { AppError } from "../utils/appError.js";

export const notFound = (req, res, next) => {
  const error = new AppError("Route not found", 404);
  next(error);
};
