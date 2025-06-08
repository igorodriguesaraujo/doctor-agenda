'use server'

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { doctorsTable } from "@/database/schema";
import { actionClient } from "@/lib/next-safe-action"
import { schema } from "./schema";

export const deleteDoctorAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      throw new Error('Usuário não autozizado.')
    }

    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.id),
    })

    if (!doctor) {
      throw new Error('Médico não encotrado.')
    }

    if (session.user.clinic?.id !== doctor.clinicId) {
      throw new Error('Clinica não autozizado.')
    }

    await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id))
    revalidatePath('/doctors')
  })