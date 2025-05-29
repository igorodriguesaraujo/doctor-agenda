import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAllCllinics } from "@/actions/clinic/get-all-clinics";

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
    redirect('/welcome-first-clinic')
  }

  return (
    <>
      <h1>Página de Dashboard</h1>
      <strong>{session?.user?.name}</strong>
      <br />
      <small>{session?.user.email}</small>
      <br />
    </>
  )
}