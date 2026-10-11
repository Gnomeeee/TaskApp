import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth.js";
import { loginSchema } from "../features/auth/authValidation.js";
import Form from "../components/ui/Form.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

const inputClass =
  "w-full h-12 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900" +
  "placeholder:text-slate-300 placeholder:text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200";
export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const newFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!newFieldErrors[field]) {
          newFieldErrors[field] = issue.message;
        }
      });

      setFieldErrors(newFieldErrors);
      return;
    }

    setLoading(true);
    try {
      await login(result.data.email, result.data.password);
      navigate("/tasks");
    } catch (err) {
      setFormError(
        err.message === "Failed to fetch"
          ? "Unable to reach the server. Check your connection"
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-7 shadow-xl shadow-slate-900/5 sm:p-9">
        <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/20">T</div>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600">Sign in to continue to TaskApp.</p>
        </header>
        <Form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 [&_label]:mb-1.5 [&_label]:block [&_label]:text-sm [&_label]:font-semibold [&_label]:text-slate-800"
        >
          <Input
            className={inputClass}
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={fieldErrors.email}
            placeholder="you@example.com"
          />
          <Input
            className={inputClass}
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={fieldErrors.password}
            placeholder="Enter your password"
          />

          {formError && <ErrorMessage message={formError} />}
          <Button type="submit" disabled={loading} aria-busy={loading} className="w-full">
            {loading ? <Spinner label="Logging in..." /> : "Login"}
          </Button>
        </Form>
        <p className="mt-6 text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
