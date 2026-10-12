import { useState } from "react";
import Form from "../../components/ui/Form.jsx";
import ErrorMessage from "../../components/ui/ErrorMessage.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button";

const CategoryForm = ({ addCategory }) => {
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name must be a non-empty-string");
      return;
    }

    setError("");
    setPending(true);
    try {
      await addCategory({ name: name.trim() });
      setName("");
    } catch (err) {
      setError(err.message || "Failed to create category");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Add a category</h2>
        <p className="mt-1 text-sm text-slate-500">
          Group related tasks so they’re easier to find.
        </p>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
      >
        <Input
          id="new-category-name"
          name="category"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
          aria-label="New category name"
        />

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Adding…" : "Add category"}
        </Button>
        {error && <ErrorMessage className="sm:col-span-full" message={error} />}
      </Form>
    </section>
  );
};

export default CategoryForm;
