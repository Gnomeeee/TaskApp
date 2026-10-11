import TaskItem from "./TaskItem.jsx";

const TaskList = ({
  tasks,
  error,
  isLoading,
  editTask,
  deleteTask,
  toggleTask,
}) => {
  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">Loading your tasks…</div>;
  }

  if (error) {
    return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  }

  if (tasks.length === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm"><p className="font-semibold text-slate-800">No tasks found</p><p className="mt-1 text-sm text-slate-500">Add a task above to get started.</p></div>;
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
          categories={[]}
          onCategoryChange={(id, categoryId) =>
            editTask(id, { categoryId: categoryId || null })
          }
        />
      ))}
    </div>
  );
};

export default TaskList;
