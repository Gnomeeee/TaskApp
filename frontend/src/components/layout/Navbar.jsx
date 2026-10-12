import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth.js";
import Button from "../ui/Button.jsx";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 px-6 py-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex gap-4 ">
        <Link
          to="/tasks"
          className="font-medium text-slate-700 hover:text-indigo-600"
        >
          Tasks
        </Link>
        <Link
          to="/categories"
          className="font-medium text-slate-700 hover:text-indigo-600"
        >
          Categories
        </Link>
      </div>
      <Button onClick={handleLogout} className="text-sm text-slate-500">
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
