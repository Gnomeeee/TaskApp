import { useCallback, useEffect, useState } from "react";
import * as categoriesApi from "../../services/api/category.api.js";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await categoriesApi.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCategory = async (data) => {
    await categoriesApi.createCategory(data);
    await fetchCategories();
  };

  const editCategory = async (id, data) => {
    const updated = await categoriesApi.updateCategory(id, data);
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === id ? updated : category,
      ),
    );
  };

  const deleteCategory = async (id) => {
    await categoriesApi.deleteCategory(id);
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
  };
};
