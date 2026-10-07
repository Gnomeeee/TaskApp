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
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`${className} ${isPassword ? "pr-10" : ""}`}
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
