const ErrorMessage = ({ id, message, className = "", ...props }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className={`text-sm leading-relaxed text-red-600 ${className}`}
      {...props}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
