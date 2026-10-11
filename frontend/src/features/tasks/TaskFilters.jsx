import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.js";
import Select from "../../components/ui/Select.jsx";
import Input from "../../components/ui/Input.jsx";

const TaskFilters = ({
  search,
  setSearch,
  completed,
  setCompleted,
  setPage,
}) => {
  const [searchInput, setSearchInput] = useState(search);
  const debouncedValue = useDebounce(searchInput, 400);
  const OPTIONS = [
    { value: "true", label: "Completed" },
    { value: "false", label: "Active" },
  ];

  useEffect(() => {
    setSearch(debouncedValue);
    setPage(1);
  }, [debouncedValue]);

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_200px] sm:p-5">
      <Input
        id="task-search"
        aria-label="Search tasks"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
      />
      <Select
        id="task-status"
        aria-label="Filter tasks by status"
        value={completed}
        onChange={(e) => {
          setCompleted(e.target.value);
          setPage(1);
        }}
        options={OPTIONS}
        placeholder="All"
      />
    </div>
  );
};

export default TaskFilters;
