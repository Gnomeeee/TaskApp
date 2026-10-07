const Button = ({ type = "button", children, className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
