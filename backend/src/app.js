import express from "express";
import helmet from "helmet";
import cors from "cors";
import env from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
