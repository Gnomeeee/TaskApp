import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const Input = ({
  id,
  name = "",
  label,
  type = "text",
  className = "",
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0">
      {label && <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor={id}>{label}</label>}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : ""} ${isPassword ? "pr-10" : ""} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
          </button>
        )}
      </div>

      <ErrorMessage id={errorId} message={error} />
    </div>
  );
};

export default Input;
