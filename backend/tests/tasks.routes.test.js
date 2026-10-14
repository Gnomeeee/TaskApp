import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("../src/modules/tasks/task.service.js", () => ({
  getAllTasks: vi.fn(),
  createTask: vi.fn(),
  getTaskById: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

import app from "../src/app.js";
import * as taskService from "../src/modules/tasks/task.service.js";
import { signToken } from "../src/utils/token.js";

describe("Get /api/tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects a request without a token", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(401);
  });

  it("returns tasks for an authenticated user", async () => {
    const payload = {
      data: [{ id: 1, title: "First task", completed: false }],
      meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
    };
    taskService.getAllTasks.mockResolvedValue(payload);

    const token = signToken(42);
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(payload);
    expect(taskService.getAllTasks).toHaveBeenCalledWith(42, {
      search: undefined,
      completed: undefined,
      page: 1,
      limit: 10,
    });
  });
});
