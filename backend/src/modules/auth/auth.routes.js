import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validator.js";
import { login, logout, register } from "./auth.controller.js";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

const route = Router();

route.post("/register", authLimiter, validate(registerSchema), register);
route.post("/login", authLimiter, validate(loginSchema), login);
route.post("/logout", logout);

export default route;
