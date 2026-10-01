import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
