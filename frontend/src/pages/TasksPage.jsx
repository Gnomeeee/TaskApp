import Pagination from "../features/tasks/Pagination.jsx";
import TaskFilters from "../features/tasks/TaskFilters.jsx";
import TaskForm from "../features/tasks/TaskForm.jsx";
import TaskList from "../features/tasks/TaskList.jsx";
import { useTasks } from "../features/tasks/useTasks.js";

export default function TasksPage() {
  const taskState = useTasks();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-5 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Your workspace</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">My tasks</h1>
          <p className="mt-2 text-sm text-slate-500">A little progress each day adds up.</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {taskState.meta.total ?? taskState.tasks.length} {taskState.meta.total === 1 ? "task" : "tasks"}
        </div>
      </header>

      <TaskForm addTask={taskState.addTask} categories={[]} />

      <section aria-label="Filter tasks">
        <TaskFilters
          search={taskState.search}
          setSearch={taskState.setSearch}
          completed={taskState.completed}
          setCompleted={taskState.setCompleted}
          setPage={taskState.setPage}
        />
      </section>

      <TaskList
        tasks={taskState.tasks}
        error={taskState.error}
        isLoading={taskState.isLoading}
        editTask={taskState.editTask}
        deleteTask={taskState.deleteTask}
        toggleTask={taskState.toggleTask}
      />

      {taskState.meta.page && (
        <Pagination
          page={taskState.meta.page}
          totalPages={taskState.meta.totalPages}
          setPage={taskState.setPage}
        />
      )}
    </main>
  );
}
