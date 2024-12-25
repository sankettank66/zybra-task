"use client"
import { DataTableDemo } from "@/components/DataTables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <DataTableDemo />
            </main>
        </QueryClientProvider>
    );
}
