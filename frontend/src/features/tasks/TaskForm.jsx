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

    if (!title.trim()) {
      setError("Title must be a non-empty string");
      return;
    }

    setError("");
    setPending(true);
    try {
      await addTask({
        title: title.trim(),
        categoryId: categoryId || null,
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
    <div>
      <Form onSubmit={handleSubmit} className="flex ">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
        <Select
          value={categoryId}
          options={categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          }))}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="No Category"
        />
        <Button type="submit" disabled={pending}>
          Add
        </Button>
        {error && <ErrorMessage message={error} />}
      </Form>
    </div>
  );
};

export default TaskForm;
