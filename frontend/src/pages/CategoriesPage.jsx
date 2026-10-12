import CategoryForm from "../features/categories/CategoryForm.jsx";
import CategoryList from "../features/categories/CategoryList";
import { useCategories } from "../features/categories/useCategories.js";
import Navbar from "../components/layout/Navbar.jsx";

export default function CategoriesPage() {
  const categoriesState = useCategories();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-5 px-4 py-8 sm:px-6 sm:py-12">
      <Navbar />

      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
          Your workspace
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Categories
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Organize your tasks into groups that make sense to you.
        </p>
      </header>
      <CategoryForm addCategory={categoriesState.addCategory} />
      <CategoryList
        categories={categoriesState.categories}
        error={categoriesState.error}
        isLoading={categoriesState.isLoading}
        onUpdate={categoriesState.editCategory}
        onDelete={categoriesState.deleteCategory}
      />
    </main>
  );
}
