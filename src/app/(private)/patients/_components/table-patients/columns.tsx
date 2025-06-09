"use client"

import { ColumnDef } from "@tanstack/react-table"
import { patientsTable } from "@/database/schema"
import { TablePatientAction } from "../table-patient-action";

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
    cell: (params) => {
      const patient = params.row.original
      return (<TablePatientAction patient={patient} />)
    }
  }
]