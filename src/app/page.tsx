"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // use the new navigation hook from Next.js 13

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    // Redirect to '/users' page
    router.push("/users");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Welcome to User Management</h1>
        <Button
          onClick={handleRedirect}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go to Users
        </Button>
      </div>
    </main>
  );
}
