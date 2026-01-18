import Link from "next/link";
import { paths } from "@/constants/routes";

interface LoginRequiredProps {
  message?: string;
  nextPath?: string;
}

export default function LoginRequired({
  message = "You need to log in to view this page.",
  nextPath = "/",
}: LoginRequiredProps) {
  const loginUrl = `${paths.AUTH.LOGIN}?next=${encodeURIComponent(nextPath)}`;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 text-center shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">Login Required</h2>

        <p className="mb-6 text-sm text-gray-600">{message}</p>

        <Link
          href={loginUrl}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
