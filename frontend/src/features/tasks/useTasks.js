import { useCallback, useEffect, useState } from "react";
import * as tasksApi from "../../services/api/task.api.js";
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await tasksApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = async (data) => {
    const task = await tasksApi.createTask(data);
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const editTask = async (id, data) => {
    const updatedTask = await tasksApi.updateTask(id, data);
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? updatedTask : task)),
    );
  };

  const deleteTask = async (id) => {
    await tasksApi.deleteTask(id);
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
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
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
  };
};
