import { useState } from "react";
import Button from "../../components/ui/Button.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Select from "../../components/ui/Select.jsx";

const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  categories,
  onCategoryChange,
}) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  const handleSave = async () => {
    setError("");
    setPending(true);

    try {
      await onEdit(task.id, { title: draftTitle });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save task");
    } finally {
      setPending(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftTitle(task.title);
  };

  const handleToggle = async () => {
    setError("");

    setPending(true);
    try {
      await onToggle(task.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  const handleCategoryChange = async (event) => {
    setError("");
    setPending(true);

    try {
      const categoryId = event.target.value
        ? Number(event.target.value)
        : null;
      await onCategoryChange(task.id, categoryId);
    } catch (err) {
      setError(err.message || "Failed to update task category");
    } finally {
      setPending(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    setError("");

    setPending(true);
    try {
      await onDelete(task.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <article
      className={`group grid gap-3 p-4 transition hover:bg-slate-50/80 sm:grid-cols-[auto_170px_minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4 sm:px-5 ${task.completed ? "bg-slate-50/50" : ""}`}
    >
      <input
        className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500"
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={pending}
      />

      <Select
        id={`category-${task.id}`}
        name="categoryId"
        value={String(task.categoryId ?? "")}
        options={categories.map((category) => ({
          value: String(category.id),
          label: category.name,
        }))}
        disabled={pending}
        placeholder="No Category"
        onChange={handleCategoryChange}
        aria-label={`Category for ${task.title}`}
        className="py-2! text-xs!"
      />

      {isEditing ? (
        <>
          <input
            aria-label={`Edit ${task.title}`}
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:col-span-2"
          />
          <Button onClick={handleSave} disabled={pending}>
            Save
          </Button>
          <Button onClick={handleCancel} disabled={pending}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <label
            className={`min-w-0 cursor-pointer wrap-break-word text-sm font-medium ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}
            htmlFor={`task-${task.id}`}
          >
            {task.title}
          </label>

          <div className="flex items-center gap-2 sm:justify-end">
            <Button
              variant="secondary"
              onClick={handleEdit}
              disabled={pending}
              aria-label="Edit task"
            >
              Edit
            </Button>
          </div>
        </>
      )}

      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={pending}
        aria-label="Delete task"
      >
        Delete
      </Button>

      {error && <ErrorMessage message={error} />}
    </article>
  );
};

export default TaskItem;
