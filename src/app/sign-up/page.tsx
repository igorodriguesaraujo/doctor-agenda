"use client"

import Link from "next/link";
import Image from "next/image";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório", }),
  email: z.string().trim().min(1, { message: 'Campo obrigatório' }).email({ message: 'E-mail invalido.' }),
  password: z.string().trim().min(1, { message: 'Campo obrigatório' }).min(8, { message: 'Mínimo de 8 caracteres.' })
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(data: SignUpFormData) {
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
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="************" {...field} />
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="primary">
              Cadastrar
            </Button>
          </form>
        </Form>

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