"use client"

import { useQuery } from "@tanstack/react-query"
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Skeleton } from "./ui/skeleton"
import ErrorComponent from "./ErrorComponent"

export type User = {
	id: number
	firstName: string
	lastName: string
	email: string
	phone: string
	username: string
	image: string
}

interface UsersResponse {
	users: User[]
	total: number
	skip: number
	limit: number
}

const fetchUsers = async (page: number): Promise<UsersResponse> => {
	const limit = 10
	const skip = (page - 1) * limit
	const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
	return response.json()
}



export function DataTableDemo() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get('page') || '1', 10);
	// const page = (validPage > 0) ? validPage : 1;
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const [globalFilter, setGlobalFilter] = React.useState("")

	const { data, isLoading, isError, error, isFetching } = useQuery<UsersResponse>({
		queryKey: ['users', page],
		queryFn: () => fetchUsers(page),
		enabled: page >= 1
	})
	const columns: ColumnDef<User>[] = [
		{
			id: "select",
			header: "Sr No.",
			cell: ({ row }) => {
				// Calculate Sr No. based on the current page and row index
				const srNo = row.index + 1 + (page - 1) * 10; // Assuming limit is 10
				return <div>{srNo}</div>;
			},
			enableSorting: true,
			enableHiding: false,
		},
		{
			id: "image",
			header: "Profile Image",
			cell: ({ row }) => {
				// Display user image or a placeholder
				const imageUrl = row.original.image; // Access image through row.original
				return (
					<img
						src={imageUrl || "/path/to/placeholder.jpg"} // Replace with a default image or placeholder
						alt={`${row.original.firstName} ${row.original.lastName}`} // Access user names through row.original
						className="h-10 w-10 rounded-full object-cover"
					/>
				);
			},
		}
		,
		{
			accessorKey: "firstName",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						First Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="capitalize">{row.getValue("firstName")}</div>,
		},
		{
			accessorKey: "lastName",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Last Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="capitalize">{row.getValue("lastName")}</div>,
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Email
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
		},
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => <div>{row.getValue("phone")}</div>,
		},
		{
			accessorKey: "username",
			header: "Username",
			cell: ({ row }) => <div>{row.getValue("username")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const user = row.original

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(user.id.toString())}
							>
								Copy user ID
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
	const tableData = React.useMemo(
		() => (isLoading || isFetching ? Array(10).fill({}) : data?.users || []),
		[isLoading, isFetching, data]
	);
	const tableColumns = React.useMemo(
		() =>
			isLoading || isFetching
				? columns.map((column) => ({
					...column,
					cell: () => (
						<div className="flex items-center space-x-2">
							{/* Skeleton for Text */}
							<Skeleton className="w-[100px] h-[15px] rounded-md" />
						</div>
					)
				}))
				: columns,
		[isLoading, isFetching]
	);
	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
	})

	// if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />
	if (page < 1) return <ErrorComponent message="Invalid page number" />
	if (isError) return <ErrorComponent message={error.message} />

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Search all columns..."
					value={globalFilter ?? ""}
					onChange={(event) => setGlobalFilter(String(event.target.value))}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="space-x-2">
					Page:- {page}
				</div>
				{table.getRowModel().rows?.length > 0 && (
					<>
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => router.push(`users/?page=${page - 1}`)}
								disabled={page === 1}
								className={`${page === 1 ? 'cursor-not-allowed' : ''}`}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => router.push(`users/?page=${page + 1}`)}
								disabled={!data || data.users.length < data.limit}
							>
								Next
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

