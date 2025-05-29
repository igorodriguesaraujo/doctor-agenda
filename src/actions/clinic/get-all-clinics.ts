"use server"

import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle"
import { headers } from "next/headers";
import { usersToClinicsTable } from "@/database/schema";

export async function getAllCllinics() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) throw new Error("Usuário não autorizado.");

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id)
  })

  return clinics;
}