'use client'
import { z } from "zod";
import React from 'react';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { PatternFormat } from "react-number-format";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { patientsTable } from "@/database/schema";
import { useAction } from "next-safe-action/hooks";
import { upsertPatientAction } from "@/actions/patients/upsert-patient-action";

const schema = z.object({
  name: z.string().min(1, { message: 'Campo Obrigatório' }),
  email: z.string().email('E-mail invalido').min(1, { message: 'Campo Obrigatório' }),
  phoneNumber: z.string().min(1, { message: 'Campo Obrigatório' }),
  sex: z.union([z.literal('female'), z.literal('male')])
})

type UpsertPatientSchema = z.infer<typeof schema>

interface FormUpsertPatientProps {
  patient?: typeof patientsTable.$inferSelect;
  onSuccess?: () => void;
}

export function FormUpsertPatient({ onSuccess, patient }: FormUpsertPatientProps) {
  const form = useForm<UpsertPatientSchema>({
    mode: 'all',
    shouldUnregister: true,
    resolver: zodResolver(schema),
    defaultValues: {
      name: patient?.name ?? '',
      email: patient?.email ?? '',
      phoneNumber: patient?.phoneNumber ?? '',
      sex: patient?.sex ?? undefined
    }
  })

  React.useEffect(() => {
    if (onSuccess) {
      form.reset(patient);
    }
  }, [onSuccess, form, patient]);

  const { execute, isPending } = useAction(upsertPatientAction, {
    onSuccess: () => {
      toast.success('Paciente criado com sucesso!');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error('Houve um erro ao criar o paciente, Por favor tente mais tarde!' + error);
    }
  })

  async function onSubmit(data: UpsertPatientSchema) {
    execute({
      ...data,
      phone: patient?.phoneNumber ?? '',
      id: patient?.id
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          {patient ? 'Atualizar paciente' : 'Adicionar novo paciente'}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    {...field}
                    format="(##) #####-####"
                    customInput={Input} />
                </FormControl>
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <div className="flex items-center flex-wrap gap-4">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Sexo</FormLabel>
                  <FormControl className="flex flex-col gap-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}>
                      <SelectTrigger className="w-full min-h-12">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Feminino</SelectItem>
                        <SelectItem value="male">Masculino</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )} />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant="primary">
            {isPending && <Loader2 className="animate-spin me-2" />}
            {patient ? 'Atualizar' : 'Criar paciente'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}