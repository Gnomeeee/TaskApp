import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middlewares.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "./task.validator.js";

const route = Router();

route.use(requireAuth);
route.post("/", validate(createTaskSchema), createTask);
route.get("/", getAllTasks);
route.get("/:id", getTaskById);
route.patch("/:id", validate(updateTaskSchema), updateTask);
route.delete("/:id", deleteTask);

export default route;
