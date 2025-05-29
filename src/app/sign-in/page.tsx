"use client"

import { z } from "zod"
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import LogoDoc from '@/assets/logo.svg'


const signInSchema = z.object({
  email: z.string().trim().min(1, { message: 'Campo obrigatório' }).email({ message: 'E-mail invalido.' }),
  password: z.string().trim().min(1, { message: 'Campo obrigatório' }).min(8, { message: 'Mínimo de 8 caracteres' })
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignIn() {

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(data: SignInFormData) {
    console.log(data);
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-gray-50">
      <div className="w-full max-w-md">
        <div
          className="flex flex-col items-center justify-center text-center my-8 gap-4">
          <Image src={LogoDoc} width={150} height={50} alt="Logo Doc" />
          <span className="text-base text-gray-500">Nunca foi tão fácil gerenciar um clínica.</span>
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl className="flex flex-col gap-3">
                    <Input type="password" placeholder="************" {...field} />
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )} />

            <Button
              type="submit"
              variant="primary">
              Acessar
            </Button>
          </form>
        </Form>

        <div className="text-center my-4 text-sm">
          <span className="text-gray-500">Pensando em fazer a gestão da sua clínica, </span>
          <Link href='/sign-up' className="text-doc-primary font-bold underline">
            Clique aqui
          </Link>
        </div>
      </div>
    </main>
  )
}