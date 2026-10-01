import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/appError.js";

export const getAllTasks = async (userId) => {
  const where = { userId: userId };

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { created_at: "desc" },
    include: {
      category: true,
    },
  });

  return tasks;
};

export const createTask = async (userId, { title, categoryId }) => {
  if (categoryId !== undefined && categoryId !== null) {
    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId: userId },
    });
    if (!category) throw new AppError("Category not found", 404);
  }

  const task = await prisma.task.create({
    data: { title, userId, categoryId: categoryId ?? null },
  });

  return task;
};

export const getTaskById = async (userId, taskId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId, userId },
    include: {
      category: true,
    },
  });

  if (!task) throw new AppError("Task not found", 404);

  return task;
};

export const updateTask = async (userId, taskId, data) => {
  await getTaskById(userId, taskId);

  if (data.categoryId !== undefined && data.categoryId !== null) {
    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        userId,
      },
    });

    if (!category) throw new AppError("Category not found", 404);
  }

  const updated = await prisma.task.update({
    where: { id: taskId },
    data,
  });

  return updated;
};

export const deleteTask = async (userId, taskId) => {
  await getTaskById(userId, taskId);

  const task = await prisma.task.delete({ where: { id: taskId } });
  return task;
};
