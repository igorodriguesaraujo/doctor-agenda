'use server'

import { actionClient } from "@/lib/next-safe-action"
import { schema } from "./schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"
import { patientsTable, usersToClinicsTable } from "@/database/schema"
import { revalidatePath } from "next/cache"

export const upsertPatientAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      throw new Error('Usuário não autorizado.')
    }

    if (!session.user.clinic?.id) {
      throw new Error('Clínica não encontrada.')
    }

    const userClinic = await db.query.usersToClinicsTable.findFirst({
      where: eq(usersToClinicsTable.clinicId, session.user.clinic.id)
    })

    if (!userClinic) {
      throw new Error('Clínica não encontrada.')
    }

    await db.insert(patientsTable).values({
      id: parsedInput.id,
      name: parsedInput.name,
      email: parsedInput.email,
      phoneNumber: parsedInput.phone,
      sex: parsedInput.sex,
      clinicId: userClinic.clinicId
    }).onConflictDoUpdate({
      target: [patientsTable.id],
      set: {
        ...parsedInput,
      }
    })

    revalidatePath('/patients');

    // console.log("Paciente Criado", parsedInput, userClinic);
  })
