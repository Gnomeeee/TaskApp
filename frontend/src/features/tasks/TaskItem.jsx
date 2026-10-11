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
    <div>
      <input
        className=""
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
        onChange={(e) => onCategoryChange(task.id, e.target.value)}
        aria-label={`Category for ${task.title}`}
        className="rounded-lg border border-slate-300 bg-white p-2"
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
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
            className={`${task.completed ? "line-through" : ""}`}
            htmlFor={`task-${task.id}`}
          >
            {task.title}
          </label>

          <Button
            onClick={handleEdit}
            disabled={pending}
            aria-label="Edit task"
          >
            Edit
          </Button>
        </>
      )}

      <Button
        onClick={handleDelete}
        disabled={pending}
        aria-label="Delete task"
      >
        Delete
      </Button>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default TaskItem;
