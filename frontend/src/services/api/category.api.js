import { apiRequest } from "./client.js";

export const getAllCategories = () => {
  return apiRequest("/api/categories");
};

export const createCategory = (data) => {
  return apiRequest("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCategoryById = (id) => {
  return apiRequest(`/api/categories/${id}`);
};

export const updateCategory = (id, data) => {
  return apiRequest(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteCategory = (id) => {
  return apiRequest(`/api/categories/${id}`, {
    method: "DELETE",
  });
};
