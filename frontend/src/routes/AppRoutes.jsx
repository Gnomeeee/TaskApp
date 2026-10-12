import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import TasksPage from "../pages/TasksPage.jsx";
import CategoriesPage from "../pages/CategoriesPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
}
