import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ButtonLogout } from "./_components/button-logout";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1>Página de Dashboard</h1>
      <strong>{session?.user?.name}</strong>
      <br />
      <small>{session?.user.email}</small>
      <br />
      <ButtonLogout>
        Sair
      </ButtonLogout>
    </>
  )
}