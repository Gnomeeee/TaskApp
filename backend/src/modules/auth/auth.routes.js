import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validator.js";
import { login, logout, register } from "./auth.controller.js";

const route = Router();

route.post("/register", validate(registerSchema), register);
route.post("/login", validate(loginSchema), login);
route.post("/logout", logout);

export default route;
