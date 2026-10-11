const SuccessMessage = ({ id, message, className = "", ...props }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className={`text-sm leading-relaxed text-emerald-700 ${className}`}
      {...props}
    >
      {message}
    </p>
  );
};

export default SuccessMessage;
