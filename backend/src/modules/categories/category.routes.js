import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middlewares.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./category.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validator.js";

const route = Router();

route.use(requireAuth);
route.get("/", getAllCategories);
route.post("/", validate(createCategorySchema), createCategory);
route.get("/:id", getCategoryById);
route.patch("/:id", validate(updateCategorySchema), updateCategory);
route.delete("/:id", deleteCategory);

export default route;
