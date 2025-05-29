import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import FormSignIn from "./_components/form-sign-in";

import { auth } from "@/lib/auth";

import LogoDoc from '@/assets/logo.svg'

export default async function SignIn() {
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
          <Image
            src={LogoDoc}
            width={150}
            height={50}
            alt="Logo Doc" />
          <span className="text-base text-gray-500">Nunca foi tão fácil gerenciar um clínica.</span>
        </div>

        <FormSignIn />

        <div className="text-center my-4 text-sm">
          <span className="text-gray-500">
            Pensando em fazer a gestão da sua clínica,{' '}
          </span>
          <Link href='/sign-up' className="text-doc-primary font-bold underline">
            Clique aqui
          </Link>
        </div>
      </div>
    </main>
  )
}