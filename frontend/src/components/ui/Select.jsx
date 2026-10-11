import ErrorMessage from "./ErrorMessage.jsx";

const Select = ({
  id,
  label,
  value,
  options = [],
  className = "",
  error,
  placeholder = "Choose an option",
  ...props
}) => {
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0">
      {label && <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor={id}>{label}</label>}
      <select
        id={id}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 ${error ? "border-red-400" : ""} ${className}`}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
};

export default Select;
