import { apiRequest } from "./client.js";

export const getAllTasks = (params) => {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.completed !== undefined && params.completed !== "")
    query.set("completed", params.completed);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);

  return apiRequest(`/api/tasks?${query.toString()}`);
};

export const createTask = (data) => {
  return apiRequest("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getTaskById = (id) => {
  return apiRequest(`/api/tasks/${id}`);
};

export const updateTask = (id, data) => {
  return apiRequest(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteTask = (id) => {
  return apiRequest(`/api/tasks/${id}`, {
    method: "DELETE",
  });
};
