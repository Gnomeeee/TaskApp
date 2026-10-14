import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>

      <p>Sorry, the page you're looking for doesn't exist.</p>

      <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
        Back to login
      </Link>
    </main>
  );
}
