'use server'

import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { upsertDoctorSchema } from "./schema";
import { doctorsTable } from "@/database/schema";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from 'next/cache';

dayjs.extend(utc);

export const upsertDoctorAction = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime; // 15:30:00
    const availableToTime = parsedInput.availableToTime; // 16:00:00

    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();
    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      throw new Error('Usuário não autorizado.')
    }

    if (!session?.user?.clinic?.id) {
      throw new Error('Clínica não encontrada.')
    }

    const timeTo = availableToTimeUTC.format("HH:mm:ss");
    const timeFrom = availableFromTimeUTC.format("HH:mm:ss");
    const appointmentPriceInCents = parsedInput.appointmentPrice;

    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        availableToTime: timeTo,
        availableFromTime: timeFrom,
        clinicId: session.user.clinic.id,
        appointmentPriceInCents: appointmentPriceInCents,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: timeFrom,
          availableToTime: timeTo,
          appointmentPriceInCents: appointmentPriceInCents,
        }
      });
    revalidatePath('/doctors')
  })