import { PageBreadCrumb, PageContainer, PageHeader, PageHeaderDescription, PageHeaderTitle } from "../_components/page-container"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
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
        <h2>Página de médicos</h2>
      </PageContainer>
    </>
  )
}