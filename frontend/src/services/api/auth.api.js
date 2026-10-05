import { apiRequest } from "./client.js";

export const register = (data) => {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logout = () => {
  return apiRequest("/api/auth/logout", { method: "POST" });
};
