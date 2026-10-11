import { AppError } from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as taskService from "./task.service.js";

export const getAllTasks = asyncHandler(async (req, res) => {
  const { search, completed, page, limit } = req.query;
  const result = await taskService.getAllTasks(req.userId, {
    search,
    completed,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });

  return res.status(200).json(result);
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.userId, req.body);
  return res.status(201).json(task);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId < 1)
    throw new AppError("Invalid task id", 400);

  const task = await taskService.getTaskById(req.userId, taskId);
  return res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId < 1)
    throw new AppError("Invalid task id", 400);

  const task = await taskService.updateTask(req.userId, taskId, req.body);
  return res.status(200).json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId < 1)
    throw new AppError("Invalid task id", 400);

  const task = await taskService.deleteTask(req.userId, taskId);
  return res.status(200).json(task);
});
