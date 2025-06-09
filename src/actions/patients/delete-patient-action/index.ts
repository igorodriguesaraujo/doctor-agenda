"use server"

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";

import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { deletePatientSchema } from "./schema";
import { patientsTable, usersToClinicsTable } from "@/database/schema";
import { revalidatePath } from "next/cache";

export const deletePatientAction = actionClient
  .schema(deletePatientSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      throw new Error('Usuário não autorizado.')
    }

    if (!session.user.clinic?.id) {
      throw new Error('Clínica não encontrada')
    }

    const userClinic = await db.query.usersToClinicsTable.findFirst({
      where: eq(usersToClinicsTable.clinicId, session.user.clinic.id)
    });

    if (!userClinic) {
      throw new Error('Clínica não encontrada')
    }

    const patient = await db.query.patientsTable.findFirst({
      where: eq(patientsTable.id, parsedInput.id)
    })

    if (!patient) {
      throw new Error('Paciente não encontrada')
    }

    if (patient.clinicId !== userClinic.clinicId) {
      throw new Error('Paciente não encontrada')
    }

    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id))

    revalidatePath('/patient')
  })