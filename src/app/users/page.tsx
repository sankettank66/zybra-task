"use client"
import { DataTableDemo } from "@/components/DataTables";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Home() {
    const queryClient = new QueryClient()
    return (
        <Suspense fallback={
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        }>
            <QueryClientProvider client={queryClient}>
                <main className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">User Management</h1>
                    <DataTableDemo />
                </main>
            </QueryClientProvider>
        </Suspense>
    );
}
