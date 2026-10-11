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
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className={className}
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
