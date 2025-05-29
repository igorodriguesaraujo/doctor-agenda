"use client"

import Image from "next/image";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseMedical, Loader2, PartyPopper } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createClinic } from "@/actions/clinic/create-clinic";

import LogoDoc from '@/assets/logo.svg'
import { isRedirectError } from "next/dist/client/components/redirect-error";

const schema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  email: z.string().min(1, { message: 'Campo obrigatório' }).email('e-mail invalido.')
})

type FormDataCreateClinic = z.infer<typeof schema>

export default function WelcomeFirstClinic() {

  const form = useForm<FormDataCreateClinic>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: ''
    }
  })

  async function handleSubmit({ name, email }: FormDataCreateClinic) {
    try {
      await createClinic({ name, email });
    } catch (error) {
      if (isRedirectError(error)) return;
      toast.error('Houver um error: ' + error)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-100">
      <Image
        src={LogoDoc}
        width={150}
        height={50}
        alt="Logo Doc" />

      <div className="flex flex-col gap-8 shadow-md bg-white rounded-md p-8">
        <div className="text-center">
          <PartyPopper size={56} className="text-doc-primary mx-auto my-8" />
          <h1 className="text-xl font-bold text-gray-700">Parabéns, Seja bem-vindo a Doctor Agenda!</h1>
          <p className="text-gray-500">Vamos começar a dar os primeiros passos na gestão da sua clínica.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Informe o nome da clínica" {...field} />
                  </FormControl>
                  <FormMessage className="flex gap-2" />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Informe um e-mail" {...field} />
                  </FormControl>
                  <FormMessage className="flex gap-2" />
                </FormItem>
              )} />

            <Button
              type="submit"
              variant="primary"
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : (<>
                  <BriefcaseMedical />
                  Criar sua primeira Clínica
                </>)}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}