'use client'

import dayjs from 'dayjs'
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { Loader2 } from "lucide-react"
import { NumericFormat } from 'react-number-format'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { doctorsTable } from "@/database/schema"
import { FormDataDoctor, schemaDoctor } from "../_type"
import { upsertDoctorAction } from "@/actions/doctors/upsert-doctor-actions"

interface FormUpSertDoctorProps {
  doctor?: typeof doctorsTable.$inferSelect;
  onSuccess?: () => void;
}

dayjs.extend(utc);
dayjs.locale("pt-br");

export function FormUpSertDoctor({ onSuccess, doctor }: FormUpSertDoctorProps) {
  const form = useForm<FormDataDoctor>({
    shouldUnregister: true,
    resolver: zodResolver(schemaDoctor),
    mode: 'all',
    defaultValues: {
      name: doctor?.name ?? '',
      specialty: doctor?.specialty ?? '',
      appointmentPrice: doctor?.appointmentPriceInCents
        ? doctor?.appointmentPriceInCents / 100
        : 0,
      availableFromWeekDay: doctor?.availableFromWeekDay.toString() ?? '1',
      availableToWeekDay: doctor?.availableToWeekDay.toString() ?? '6',
      availableFromTime: doctor?.availableFromTime ?? '',
      availableToTime: doctor?.availableToTime ?? '',
    }
  })

  const { execute, isPending } = useAction(upsertDoctorAction,
    {
      onSuccess: () => {
        toast.success(`${doctor
          ? 'Médico atualizado com sucesso!'
          : 'Médico criado com sucesso!'
          }`)
        onSuccess?.()
        form.reset()
      },
      onError: () => {
        toast.error('Error ao criar o médico!')
      }
    });

  async function onSubmit(data: FormDataDoctor) {
    execute({
      ...data,
      id: doctor?.id,
      availableFromWeekDay: parseInt(data.availableFromWeekDay),
      availableToWeekDay: parseInt(data.availableToWeekDay),
      appointmentPrice: data.appointmentPrice * 100
    })
  }

  return (
    <DialogContent>
      <DialogHeader className="mb-6">
        <DialogTitle className="flex items-center gap-2 text-gray-800">
          <span className="text-xl font-bold">
            {doctor
              ? 'Atualizar médico'
              : 'Adicionar novo médico'}
          </span>
        </DialogTitle>
        <DialogDescription>
          {doctor
            ? 'Atualizar dado do médico'
            : 'Adicione os médicos e suas disponíbilidades para agendamento.'
          }
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl className="flex flex-col gap-3">
                  <Input placeholder="Digite o nome" {...field} />
                </FormControl>
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full min-h-12">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Especialidade 1">Especialidade 1</SelectItem>
                      <SelectItem value="Especialidade 2">Especialidade 2</SelectItem>
                      <SelectItem value="Especialidade 3">Especialidade 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Preço da consulta:</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$ " />
                <FormMessage className="flex items-center gap-2" />
              </FormItem>
            )} />

          <div className="flex items-center flex-wrap gap-4">
            <FormField
              control={form.control}
              name="availableFromWeekDay"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>De</FormLabel>
                  <FormControl className="flex flex-col gap-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}>
                      <SelectTrigger className="w-full min-h-12">
                        <SelectValue placeholder="Do dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Domingo</SelectItem>
                        <SelectItem value="1">Segunda</SelectItem>
                        <SelectItem value="2">Terça</SelectItem>
                        <SelectItem value="3">Quarta</SelectItem>
                        <SelectItem value="4">Quinta</SelectItem>
                        <SelectItem value="5">Sexta</SelectItem>
                        <SelectItem value="6">Sábado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="availableToWeekDay"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Até</FormLabel>
                  <FormControl className="flex flex-col gap-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}>
                      <SelectTrigger className="w-full min-h-12">
                        <SelectValue placeholder="Até dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Domingo</SelectItem>
                        <SelectItem value="1">Segunda</SelectItem>
                        <SelectItem value="2">Terça</SelectItem>
                        <SelectItem value="3">Quarta</SelectItem>
                        <SelectItem value="4">Quinta</SelectItem>
                        <SelectItem value="5">Sexta</SelectItem>
                        <SelectItem value="6">Sábado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="flex items-center gap-2" />
                </FormItem>
              )} />
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <FormField
              control={form.control}
              name="availableFromTime"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>De:</FormLabel>
                    <FormControl className="flex flex-col gap-3">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Manhã
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="08:00:00">08:00</SelectItem>
                            <SelectItem value="08:30:00">08:30</SelectItem>
                            <SelectItem value="09:00:00">09:00</SelectItem>
                            <SelectItem value="09:30:00">09:30</SelectItem>
                            <SelectItem value="10:00:00">10:00</SelectItem>
                            <SelectItem value="10:30:00">10:30</SelectItem>
                            <SelectItem value="11:00:00">11:00</SelectItem>
                            <SelectItem value="11:30:00">11:30</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Tarde
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="12:00:00">12:00</SelectItem>
                            <SelectItem value="12:30:00">12:30</SelectItem>
                            <SelectItem value="13:00:00">13:00</SelectItem>
                            <SelectItem value="13:30:00">13:30</SelectItem>
                            <SelectItem value="14:00:00">14:00</SelectItem>
                            <SelectItem value="14:30:00">14:30</SelectItem>
                            <SelectItem value="15:00:00">15:00</SelectItem>
                            <SelectItem value="15:30:00">15:30</SelectItem>
                            <SelectItem value="16:00:00">16:00</SelectItem>
                            <SelectItem value="16:30:00">16:30</SelectItem>
                            <SelectItem value="17:00:00">17:00</SelectItem>
                            <SelectItem value="17:30:00">17:30</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Noite
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="18:00:00">18:00</SelectItem>
                            <SelectItem value="18:30:00">18:30</SelectItem>
                            <SelectItem value="19:00:00">19:00</SelectItem>
                            <SelectItem value="19:30:00">19:30</SelectItem>
                            <SelectItem value="20:00:00">20:00</SelectItem>
                            <SelectItem value="20:30:00">20:30</SelectItem>
                            <SelectItem value="21:00:00">21:00</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="flex items-center gap-2" />
                  </FormItem>
                );
              }} />

            <FormField
              control={form.control}
              name="availableToTime"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>Até:</FormLabel>
                    <FormControl className="flex flex-col gap-3">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Manhã
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="08:00:00">08:00</SelectItem>
                            <SelectItem value="08:30:00">08:30</SelectItem>
                            <SelectItem value="09:00:00">09:00</SelectItem>
                            <SelectItem value="09:30:00">09:30</SelectItem>
                            <SelectItem value="10:00:00">10:00</SelectItem>
                            <SelectItem value="10:30:00">10:30</SelectItem>
                            <SelectItem value="11:00:00">11:00</SelectItem>
                            <SelectItem value="11:30:00">11:30</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Tarde
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="12:00:00">12:00</SelectItem>
                            <SelectItem value="12:30:00">12:30</SelectItem>
                            <SelectItem value="13:00:00">13:00</SelectItem>
                            <SelectItem value="13:30:00">13:30</SelectItem>
                            <SelectItem value="14:00:00">14:00</SelectItem>
                            <SelectItem value="14:30:00">14:30</SelectItem>
                            <SelectItem value="15:00:00">15:00</SelectItem>
                            <SelectItem value="15:30:00">15:30</SelectItem>
                            <SelectItem value="16:00:00">16:00</SelectItem>
                            <SelectItem value="16:30:00">16:30</SelectItem>
                            <SelectItem value="17:00:00">17:00</SelectItem>
                            <SelectItem value="17:30:00">17:30</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                              Noite
                              <Separator className="my-1" />
                            </div>
                            <SelectItem value="18:00:00">18:00</SelectItem>
                            <SelectItem value="18:30:00">18:30</SelectItem>
                            <SelectItem value="19:00:00">19:00</SelectItem>
                            <SelectItem value="19:30:00">19:30</SelectItem>
                            <SelectItem value="20:00:00">20:00</SelectItem>
                            <SelectItem value="20:30:00">20:30</SelectItem>
                            <SelectItem value="21:00:00">21:00</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="flex items-center gap-2" />
                  </FormItem>
                );
              }} />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isPending}>
            {isPending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : doctor
                ? 'Atualizar'
                : 'Criar médico'
            }
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}