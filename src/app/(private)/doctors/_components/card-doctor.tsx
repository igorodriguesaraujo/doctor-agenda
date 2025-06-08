'use client'

import {
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Loader2,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { FormUpSertDoctor } from "./form-upsert-doctor"
import { doctorsTable } from "@/database/schema"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatWeekDay } from "@/utils/formatWeekDay"
import { formatTimeLocalUTC } from "@/utils/formatTimeLocalUTC"
import React from "react"
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { deleteDoctorAction } from "@/actions/doctors/delete-doctor-actions"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

interface CardDoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export function CardDoctor({ doctor }: CardDoctorProps) {
  const from = formatTimeLocalUTC(doctor.availableFromTime);
  const to = formatTimeLocalUTC(doctor.availableToTime);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDeleteDoctor, setIsOpenDeleteDoctor] = React.useState(false);


  const { execute, isPending } = useAction(deleteDoctorAction, {
    onSuccess: () => {
      toast.success('Médico deletado com sucesso!')
    },
    onError: () => {
      toast.error('Error ao deletar o médico!')
    }
  })

  return (
    <Card className="p-4 shadow-none border border-doc-primary/10 justify-between">
      <CardHeader className="p-0">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarFallback>
              {doctor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold text-gray-700">{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-4 p-0">
        <Badge
          variant="outline"
          className="px-4 py-2 rounded-full bg-doc-primary/5 border-0 font-normal">
          <Calendar className="w-6 h-6" />
          <span className="text-xs text-gray-700">

            {doctor.availableFromWeekDay === doctor.availableToWeekDay
              ? `${formatWeekDay(doctor.availableFromWeekDay)}`
              : `${formatWeekDay(doctor.availableFromWeekDay)} a ${formatWeekDay(doctor.availableToWeekDay)}`
            }
          </span>
        </Badge>

        <Badge
          variant="outline"
          className="px-4 py-2 rounded-full bg-doc-primary/5 border-0 font-normal">
          <Clock className="w-6 h-6" />
          <span className="text-xs text-gray-700">
            {formatTimeLocalUTC(doctor.availableFromTime).format('HH:mm')} ás {formatTimeLocalUTC(doctor.availableToTime).format('HH:mm')}
          </span>
        </Badge>

        <Badge
          variant="outline"
          className="px-4 py-2 rounded-full bg-doc-primary/5 border-0 font-normal">
          <DollarSign className="w-6 h-6" />
          <span className="text-xs text-gray-700">
            {formatCurrency(doctor.appointmentPriceInCents)}
          </span>
        </Badge>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-wrap gap-4 px-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              variant="primary">
              <Eye className="w-8 h-8" />
              Ver detalhes
            </Button>
          </DialogTrigger>
          <FormUpSertDoctor doctor={{
            ...doctor,
            id: doctor.id,
            availableFromTime: from.format('HH:mm:ss'),
            availableToTime: to.format('HH:mm:ss')
          }}
            onSuccess={() => setIsOpen(false)} />
        </Dialog>

        <AlertDialog open={isOpenDeleteDoctor} onOpenChange={setIsOpenDeleteDoctor} >
          <AlertDialogTrigger asChild>
            <Button className="w-full" variant='outline'>
              <Trash2 />
              Remover médico
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja remover o médico?</AlertDialogTitle>
              <AlertDialogDescription>
                Está ação não pode ser revertida, Ela removerá permanentimente o médico e todo o seu histórico.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button
                disabled={isPending}
                variant='primary'
                onClick={async () => {
                  await execute({ id: doctor.id })
                  setIsOpenDeleteDoctor(false)
                }}>
                {isPending && <Loader2 className="animate-spin me-1" />} Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card >
  )
}