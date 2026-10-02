import { AppError } from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as categoryService from "./category.service.js";

export const getAllCategories = asyncHandler(async (req, res) => {
  const category = await categoryService.getAllCategories(req.userId);
  return res.status(200).json(category);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.userId, req.body);
  return res.status(201).json(category);
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId) || categoryId < 1)
    throw new AppError("Invalid category id", 400);

  const category = await categoryService.getCategoryById(
    req.userId,
    categoryId,
  );
  return res.status(200).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId) || categoryId < 1)
    throw new AppError("Invalid category id", 400);

  const updated = await categoryService.updateCategory(
    req.userId,
    categoryId,
    req.body,
  );
  return res.status(200).json(updated);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId) || categoryId < 1)
    throw new AppError("Invalid category id", 400);

  const category = await categoryService.deleteCategory(req.userId, categoryId);
  return res.status(200).json(category);
});
