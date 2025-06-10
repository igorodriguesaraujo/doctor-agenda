import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { doctorsTable } from "@/database/schema"

import {
  PageBreadCrumb,
  PageContainer,
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle
} from "../_components/page-container"
import { CardDoctor } from "./_components/card-doctor"
import { ButtonCreateDoctor } from "./_components/button-create-doctor"

export default async function Doctors() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  if (!session.user.clinic) {
    redirect('/clinics/greting');
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
    orderBy: [desc(doctorsTable.createdAt)]
  })

  return (
    <>
      <PageContainer>
        <PageBreadCrumb />
        <PageHeader>
          <div className="flex flex-col gap-1">
            <PageHeaderTitle>
              Médicos
            </PageHeaderTitle>
            <PageHeaderDescription>
              Faça o gerenciamento dos médicos da sua clínica.
            </PageHeaderDescription>
          </div>
          <ButtonCreateDoctor />
        </PageHeader>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {doctors?.map((doctor) => (
            <CardDoctor
              key={doctor.id}
              doctor={doctor} />
          ))}
        </div>
      </PageContainer>
    </>
  )
}