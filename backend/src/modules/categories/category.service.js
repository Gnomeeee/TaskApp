import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/appError.js";

export const getAllCategories = async (userId) => {
  const category = await prisma.category.findMany({
    where: { userId },
    orderBy: { created_at: "asc" },
  });

  return category;
};

export const createCategory = async (userId, { name }) => {
  const category = await prisma.category.create({
    data: { name, userId: userId },
  });

  return category;
};

export const getCategoryById = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId },
  });

  if (!category) throw new AppError("Category not found", 404);
  return category;
};

export const updateCategory = async (userId, categoryId, data) => {
  await getCategoryById(userId, categoryId);

  const updated = await prisma.category.update({
    where: { id: categoryId, userId },
    data,
  });

  return updated;
};
export const deleteCategory = async (userId, categoryId) => {
  await getCategoryById(userId, categoryId);

  const category = await prisma.category.delete({
    where: { id: categoryId, userId },
  });

  return category;
};
