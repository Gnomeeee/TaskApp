import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError.js";
import { signToken } from "../../utils/token.js";

export const registerUser = async ({ username, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError("Email is already in use", 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, passwordHash },
  });

  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  const token = signToken(user.id);
  return { token };
};
