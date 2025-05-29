import Link from "next/link";
import Image from "next/image";

import LogoDoc from '@/assets/logo.svg'

import { FormSignUp } from "./_components/form-sign-up";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-gray-50">
      <div className="w-full max-w-md">
        <div
          className="flex flex-col items-center justify-center text-center my-8 gap-4">
          <Image src={LogoDoc} width={150} height={50} alt="Logo Doc" />
          <span className="text-base text-gray-500">Nunca foi tão fácil gerenciar um clínica.</span>
        </div>

        <FormSignUp />

        <div className="text-center my-4 text-sm">
          <span className="text-gray-500">Já tenho cadastro, </span>
          <Link href='/sign-in' className="text-doc-primary font-bold underline">
            Clique aqui
          </Link>
        </div>
      </div>
    </main>
  )
}