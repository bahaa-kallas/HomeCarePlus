import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export default function FourOhFour() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mb-4">
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            The page you are looking for does not exist.
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <Link to="/store">
            <Button variant="secondary">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}