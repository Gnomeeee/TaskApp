import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: { message: "Too many attempts, please try again later." },
});
