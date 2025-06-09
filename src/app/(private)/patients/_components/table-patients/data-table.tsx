"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React from "react"
import { Label } from "@/components/ui/label"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  function handleFiltered(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    table.getColumn(name)?.setFilterValue(value)
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="space-y-2 mb-4">
          <Label>Nome</Label>
          <Input
            type="search"
            name="name"
            className="max-w-xs h-10"
            placeholder="Pesquisar por nome"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={handleFiltered}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2 mb-4">
          <Label>E-mail</Label>
          <Input
            type="search"
            name="email"
            className="max-w-xs h-10"
            placeholder="Pesquisar por e-mail"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={handleFiltered}
            autoComplete="off"
          />
        </div>

      </div>

      <div className="rounded-lg bg-white p-4 border shadow-xs border-[#F4F4F5]">
        <Table className="">
          <TableHeader className="bg-doc-primary/5 overflow-hidden">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="!border-0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="first:rounded-tl-md first:rounded-bl-md last:rounded-br-md last:rounded-tr-md p-4 uppercase text-[#5B7189] font-bold text-xs">
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
                    <TableCell
                      key={cell.id}
                      className="p-4"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum Resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}