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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8"
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
