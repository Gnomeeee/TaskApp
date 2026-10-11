import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth.js";
import { registerSchema } from "../features/auth/authValidation.js";
import Form from "../components/ui/Form.jsx";
import Input from "../components/ui/Input.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Modal from "../components/ui/Modal.jsx";
import { IoCheckmark } from "react-icons/io5";

const inputClass =
  "w-full h-12 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900" +
  "placeholder:text-slate-300 placeholder:text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200";
export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { register } = useAuth();
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

    const result = registerSchema.safeParse(values);
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
      await register(
        result.data.username,
        result.data.email,
        result.data.password,
      );
      setShowModal(true);
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

  const redirectLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-7 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/20">T</div>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Sign up
            </h1>
            <p className="mt-2 text-slate-600">Create an account</p>
          </header>

          <Form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 [&_label]:mb-1.5 [&_label]:block [&_label]:text-sm [&_label]:font-semibold [&_label]:text-slate-800"
          >
            <Input
              className={inputClass}
              id="username"
              name="username"
              label="Username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              error={fieldErrors.username}
              placeholder="e.g. Juan Dela Cruz"
            />
            <Input
              className={inputClass}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={fieldErrors.email}
              placeholder="juandelacruz@gmail.com"
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
              placeholder="Create a password"
            />

            {formError && <ErrorMessage message={formError} />}
            <Button type="submit" disabled={loading} aria-busy={loading} className="w-full">
              {loading ? <Spinner label="Creating account..." /> : "Register"}
            </Button>
          </Form>
          <p className="mt-6 text-center text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <Modal
        isOpen={showModal}
        title=""
        showClose={false}
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <IoCheckmark className="text-3xl text-green-600" />
          </div>
        }
        button={
          <Button type="button" onClick={redirectLogin} className="w-full">
            Go to Login
          </Button>
        }
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Registration successful
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Your account has been created successfully.
          </p>
        </div>
      </Modal>
    </>
  );
}
