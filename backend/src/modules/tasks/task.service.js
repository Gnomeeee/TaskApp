import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/appError.js";

export const getAllTasks = async (
  userId,
  { search, completed, page, limit },
) => {
  const where = { userId };
  const MAX_LIMIT = 100;

  if (search !== undefined) {
    where.title = { contains: search, mode: "insensitive" };
  }

  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      throw new AppError("Completed must be true or false", 400);
    }
    where.completed = completed === "true";
  }

  if (!Number.isInteger(page) || page < 1) {
    throw new AppError("Page must be a positive integer", 400);
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new AppError("Limit must be a positive integer", 400);
  }

  if (limit > MAX_LIMIT) {
    throw new AppError(`Limit cannot exceed ${MAX_LIMIT}`, 400);
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { created_at: "asc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: true,
    },
  });

  const total = await prisma.task.count({ where });
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data: tasks,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
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
    include: {
      category: true,
    },
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
    include: {
      category: true,
    },
  });

  return updated;
};

export const deleteTask = async (userId, taskId) => {
  await getTaskById(userId, taskId);

  const task = await prisma.task.delete({ where: { id: taskId } });
  return task;
};
