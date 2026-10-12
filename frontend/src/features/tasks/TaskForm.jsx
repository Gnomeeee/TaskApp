import { useState } from "react";
import Form from "../../components/ui/Form.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Input from "../../components/ui/Input.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";

const TaskForm = ({ addTask, categories }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    setError("");
    setPending(true);
    try {
      await addTask({
        title: title.trim(),
        categoryId: categoryId ? Number(categoryId) : null,
      });
      setTitle("");
      setCategoryId("");
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Add a task</h2>
        <p className="mt-1 text-sm text-slate-500">Write down the next thing you want to get done.</p>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_200px_auto] sm:items-start"
      >
        <Input
          id="new-task-title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          aria-label="New task title"
        />
        <Select
          id="new-task-category"
          name="categoryId"
          value={categoryId}
          options={categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          }))}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="No Category"
        />
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Adding…" : "Add task"}
        </Button>
        {error && <ErrorMessage className="sm:col-span-full" message={error} />}
      </Form>
    </section>
  );
};

export default TaskForm;
