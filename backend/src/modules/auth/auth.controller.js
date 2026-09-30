import asyncHandler from "../../utils/asyncHandler.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  return res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body);
  return res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
});
