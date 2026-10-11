import TaskItem from "./TaskItem.jsx";
import { useTasks } from "./useTasks.js";

const TaskList = () => {
  const { tasks, error, isLoading, editTask, deleteTask, toggleTask } =
    useTasks();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }
  return (
    <div>
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
