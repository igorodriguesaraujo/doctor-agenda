import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  PageContainer,
  PageBreadCrumb,
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription
} from "../_components/page-container";

import { TablePatients } from "./_components/table-patients";
import { ButtonUpsertPatients } from "./_components/button-upsert-patient";

import { db } from "@/lib/drizzle";
import { patientsTable } from "@/database/schema";


export default async function Patients() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    console.log('Error: Usuário não está logado!');
    redirect('/sign-in');
  }

  if (!session.user.clinic) {
    redirect('/clinics/greting');
  }

  const patients = await db.query.patientsTable.findMany({
    orderBy: [desc(patientsTable.createdAt)]
  })

  return (
    <PageContainer>
      <PageBreadCrumb />
      <PageHeader>
        <div className="flex flex-col gap-1">
          <PageHeaderTitle>
            Pacientes
          </PageHeaderTitle>
          <PageHeaderDescription>
            Faça o gerenciamento dos seus pacientes na sua clínica.
          </PageHeaderDescription>
        </div>
        <ButtonUpsertPatients />
      </PageHeader>

      <TablePatients patients={patients} />
    </PageContainer>
  )
}