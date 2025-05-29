"use client"

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { authClient } from "@/lib/auth-client";

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório", }),
  email: z.string().trim().min(1, { message: 'Campo obrigatório' }).email({ message: 'E-mail invalido.' }),
  password: z.string().trim().min(1, { message: 'Campo obrigatório' }).min(8, { message: 'Mínimo de 8 caracteres.' })
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function FormSignUp() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit({ name, email, password }: SignUpFormData) {
    await authClient.signUp.email({
      name,
      email,
      password
    }, {
      onSuccess: () => {
        redirect('/sign-in')
      },
      onError: (ctx) => {
        if (ctx.error.code === "USER_ALREADY_EXISTS") {
          toast.error("Usuário já cadastrado!");
          return
        }
        toast.error(ctx.error.message);
      },
    });
  }

  return (
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
          variant="primary"
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : 'Criar conta'
          }
        </Button>
      </form>
    </Form>
  )
}