"use client"

import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

import { authClient } from "@/lib/auth-client";

import LogoGoogle from '@/assets/logo-google.svg';
import Image from "next/image";

const signInSchema = z.object({
  email: z.string().trim().min(1, { message: 'Campo obrigatório' }).email({ message: 'E-mail invalido.' }),
  password: z.string().trim().min(1, { message: 'Campo obrigatório' }).min(8, { message: 'Mínimo de 8 caracteres' })
})

type SignInFormData = z.infer<typeof signInSchema>

export default function FormSignIn() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSignInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: '/dashboard'
    })
  }

  async function handleSubmit(data: SignInFormData) {
    await authClient.signIn.email({
      email: data.email,
      password: data.password
    }, {
      onSuccess: () => {
        redirect('/dashboard')
      },
      onError: (ctx) => {
        if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
          toast.error("E-mail ou senha invalida");
          return
        }

        toast.error(ctx.error.message);
      },
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
          variant="primary"
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : 'Acessar conta'
          }
        </Button>

        <Button
          type="button"
          variant='outline'
          onClick={handleSignInWithGoogle}
        >
          <Image
            src={LogoGoogle}
            width={28}
            height={28}
            alt="Login com o Google" />
          <span>Continue com o Google</span>
        </Button>
      </form>
    </Form>
  )
}