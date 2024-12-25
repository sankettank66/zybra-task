# User Management Table - Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The project implements a user management table with advanced features, including pagination, sorting, filtering, and batch actions using TanStack Table and TanStack Query.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

### Core Functionalities
- **Pagination** – Supports server-side pagination with page controls.
- **Sorting** – Clickable column headers for ascending/descending sorting.
- **Column Filtering** – Filterable columns with dynamic inputs.
- **Global Search** – Search all columns with a single input.
- **Column Visibility** – Toggle column visibility using a dropdown.
- **Error Handling** – Custom error component for API failures.

### New Functionalities
- **Row Expansion** – Click on a row to expand and view more user details.
- **Batch Actions** – Select multiple rows to apply actions (bulk delete, export, etc.).
- **Export to CSV/Excel** – Download the current table view as CSV or Excel.
- **Inline Editing** – Edit user data directly in the table.
- **Status Toggle** – Activate/Deactivate users with a switch.
- **Real-Time Updates** – Implemented WebSocket for real-time user updates.
- **Page Size Selector** – Choose the number of rows displayed per page (10, 20, 50, 100).
- **Drag-and-Drop Column Reordering** – Customize column order by dragging.

## API Integration
User data is fetched from the [DummyJSON API](https://dummyjson.com/users) with pagination and limit parameters.

### API Endpoint
```
https://dummyjson.com/users?limit={limit}&skip={skip}
```

### Example Request
```javascript
const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
```

## Components
- **`DataTableDemo.tsx`** – Main component rendering the user table.
- **`ErrorComponent.tsx`** – Error message component for invalid pages or API failures.
- **`Skeleton.tsx`** – Skeleton loading component for smooth UI during data fetching.
- **`DropdownMenu.tsx`** – Column visibility and action dropdown.

## Learn More
To learn more about the tools used:
- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Table](https://tanstack.com/table/v8/docs/overview)
- [TanStack Query](https://tanstack.com/query/v4/docs/overview)
- [Shadcn UI](https://ui.shadcn.com)

## Deploy on Vercel
Deploy the project easily using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

