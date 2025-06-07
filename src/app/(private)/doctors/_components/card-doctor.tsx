import {
  Calendar,
  Clock,
  DollarSign,
  Eye,
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
import { formatTimeLocalUTC } from "@/utils/formatTimeUTC"

interface CardDoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export function CardDoctor({ doctor }: CardDoctorProps) {
  return (
    <Card className="p-4 shadow-none border border-doc-primary/10">
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

      <CardFooter className="px-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              variant="primary">
              <Eye className="w-8 h-8" />
              Ver detalhes
            </Button>
          </DialogTrigger>
          <FormUpSertDoctor />
        </Dialog>
      </CardFooter>
    </Card>
  )
}