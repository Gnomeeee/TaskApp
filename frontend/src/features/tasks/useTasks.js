import { useCallback, useEffect, useState } from "react";
import * as tasksApi from "../../services/api/task.api.js";
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await tasksApi.getAllTasks({
        search,
        completed,
        page,
        limit: 10,
      });
      setTasks(data.data);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [search, completed, page]);

  const addTask = async (data) => {
    await tasksApi.createTask(data);
    await fetchTasks();
  };

  const editTask = async (id, data) => {
    const updatedTask = await tasksApi.updateTask(id, data);
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? updatedTask : task)),
    );
  };

  const deleteTask = async (id) => {
    await tasksApi.deleteTask(id);
    await fetchTasks();
  };

  const toggleTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    await editTask(id, {
      completed: !task.completed,
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    meta,
    search,
    setSearch,
    completed,
    setCompleted,
    page,
    setPage,
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
  };
};
