import { patientsTable } from "@/database/schema"
import { DataTable } from "./table-patients/data-table";
import { columns } from "./table-patients/columns";

interface TablePatientsProps {
  patients: typeof patientsTable.$inferSelect[];
}

export function TablePatients({ patients }: TablePatientsProps) {
  return (
    <div className="container w-full mx-auto py-10">
      <DataTable columns={columns} data={patients} />
    </div>
  )
}