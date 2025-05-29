"use server"

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";

import { clinicsTable, usersToClinicsTable } from "@/database/schema";
import { redirect } from "next/navigation";

interface IClinic {
  name: string;
  email: string;
}

export async function createClinic({ name, email }: IClinic) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) throw new Error("Usuário não autorizado.")

  const [clinic] = await db.insert(clinicsTable).values({
    name,
    email
  }).returning()

  await db.insert(usersToClinicsTable).values({
    clinicId: clinic.id,
    userId: session.user.id
  });

  redirect('/dashboard');
} 