import { ImSpinner } from "react-icons/im";

const Spinner = ({ label = "Loading...", className = "" }) => {
  return (
    <div className="inline-flex items-center justify-center gap-2" role="status">
      <span>{label}</span>
      <ImSpinner
        aria-hidden="true"
        className={`text-lg animate-spin ${className}`}
      />
    </div>
  );
};

export default Spinner;
