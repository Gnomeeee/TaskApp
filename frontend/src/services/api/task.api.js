import { apiRequest } from "./client.js";

export const getAllTasks = (params) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return apiRequest(`/api/tasks${query}`);
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
