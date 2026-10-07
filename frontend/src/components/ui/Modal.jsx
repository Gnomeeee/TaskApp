import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({
  isOpen,
  onClose,
  title,
  icon,
  showClose = true,
  button,
  children,
  ...prop
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        {...prop}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>

          {showClose && (
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              type="button"
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoCloseCircleOutline />
            </button>
          )}
        </div>

        {icon && <div className="mt-4 flex justify-center">{icon}</div>}

        <div className="mt-4">{children}</div>

        {button && <div className="mt-6 flex justify-end">{button}</div>}
      </div>
    </div>
  );
};

export default Modal;
