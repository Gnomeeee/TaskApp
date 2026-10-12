import Button from "../../components/ui/Button.jsx";

const CategoryList = ({ categories, error, isLoading, onUpdate, onDelete }) => {
  const handleRename = (category) => {
    const newName = window.prompt("New category name:", category.name);
    if (newName && newName.trim()) {
      onUpdate(category.id, { name: newName.trim() });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">
        Loading your categories…
      </div>
    );
  }

  if (error) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {error}
      </p>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
        <p className="font-semibold text-slate-800">No Categories found</p>
        <p className="mt-1 text-sm text-slate-500">Add a Category.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {categories.map((category) => (
        <article
          className="flex flex-col gap-3 px-4 py-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-5"
          key={category.id}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              {category.name.slice(0, 1).toUpperCase()}
            </span>
            <p className="wrap-break-word text-sm font-semibold text-slate-800">
              {category.name}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleRename(category)}
            >
              Rename
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => onDelete(category.id)}
            >
              Delete
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CategoryList;
