import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAllCllinics } from "@/actions/clinic/get-all-clinics";
import { Button } from "@/components/ui/button";
import { Calendar1, ChevronDown, Download } from "lucide-react";
import { PageContainer, PageBreadCrumb, PageHeader, PageHeaderDescription, PageHeaderTitle, PageHeaderAction } from "../_components/page-container";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  const clinics = await getAllCllinics()
  const isClinicExists = (clinics.length === 0)

  if (isClinicExists) {
    redirect('/clinics/greting')
  }

  return (
    <PageContainer>
      <PageBreadCrumb />
      <PageHeader>
        <div className="flex flex-col gap-1">
          <PageHeaderTitle>
            Dashboard
          </PageHeaderTitle>
          <PageHeaderDescription>
            Tenha acesso as estátisticas e métricas da sua clínica.
          </PageHeaderDescription>
        </div>
        <PageHeaderAction>
          <Button size="sm" variant="outline">
            <Calendar1 size={14} />
            Maio
            <ChevronDown size={14} />
          </Button>
          <Button variant="primary" size="sm">
            <Download />
            Exportar CSV
          </Button>
        </PageHeaderAction>
      </PageHeader>
      <h2>Página de Dashboard</h2>
    </PageContainer>
  )
}