"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const data: FileType[] = [
  {
    id: "m5gr84i9",
    name: "Peng Meeting",
    type: "Audio",
    duration: "20/01/2023",
    date_created: "Tofunmi",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "3u1reuv4",
    name: "Tofunmi Idowu",
    type: "SML10025",
    duration: "1/5/2023",
    date_created: "Constance",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "derv1ws0",
    name: "Naomi Igimoh",
    type: "SML10025",
    duration: "25/4/2023",
    date_created: "Shakirat",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "5kma53ae",
    name: "Edu Hermanns",
    type: "SML10025",
    duration: "20/4/2023",
    date_created: "Tofunmi",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "lfsdf32fasd",
    name: "Timmy Adubi",
    type: "SML10025",
    duration: "20/4/2023",
    date_created: "Tofunmi",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "kwejfksf0",
    name: "Alex Oyebade",
    type: "SML10025",
    duration: "20/4/2023",
    date_created: "Shakirat",
    last_updated: "Table cell",
    action: "",
  },
  {
    id: "fasf244",
    name: "Ekene Smart",
    type: "SML10025",
    duration: "20/4/2023",
    date_created: "Shakirat",
    last_updated: "Table cell",
    action: "",
  },
];

export type FileType = {
  id: string;
  name: string;
  type: "Audio" | "SML10025";
  duration: string;
  date_created: string;
  last_updated: string;
  action: any;
};

export const columns: ColumnDef<FileType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-neutral-900 text-sm">Name</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ table }) => <div className="text-neutral-900 text-sm">Type</div>,
    cell: ({ row }) => (
      <div className="text-neutral-900 text-sm">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: () => <div className="text-neutral-900 text-sm">Duration</div>,
    cell: ({ row }) => {
      return (
        <div className="text-neutral-900 text-sm">
          {row.getValue("duration")}
        </div>
      );
    },
  },
  {
    accessorKey: "date_created",
    header: () => <div className="text-neutral-900 text-sm">Date created</div>,
    cell: ({ row }) => {
      return (
        <div className="text-neutral-900 text-sm">
          {row.getValue("date_created")}
        </div>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: () => <div className="text-neutral-900 text-sm">Last updated</div>,
    cell: ({ row }) => {
      return (
        <div className="text-neutral-900 text-sm">
          {row.getValue("last_updated")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-neutral-900 text-sm">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-neutral-900 text-sm">{row.getValue("action")}</div>
      );
    },
  },
];

export default function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
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
    },
  });

  return (
    <Card className="px-6 py-3">
      <h3 className="text-lg text-black font-semibold">Recent Files</h3>
      <Separator className="mt-3 mb-1" />
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-gray-50 shadow-sm"
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
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-[#EBF3FF]">
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
                    );
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
