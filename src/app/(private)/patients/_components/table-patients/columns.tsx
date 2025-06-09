"use client"

import { Edit, MoreVerticalIcon, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"

import { patientsTable } from "@/database/schema"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type TablePatients = typeof patientsTable.$inferSelect;

export const columns: ColumnDef<TablePatients>[] = [
  {
    id: 'name',
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: 'email',
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: 'phoneNumber',
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
  {
    id: 'sex',
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const sexo = params.row.original.sex;
      return sexo === 'male' ? 'Masculino' : 'Feminino'
    }
  },
  {
    id: 'action',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVerticalIcon className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Edit />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]