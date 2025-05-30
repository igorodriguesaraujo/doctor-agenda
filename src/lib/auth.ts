import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from '@/database/schema'

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [
    customSession(async ({ user, session }) => {
      // Plano Free
      const [clinic] = await db.query.usersToClinicsTable.findMany({
        where: eq(schema.usersToClinicsTable.userId, user.id),
        with: {
          clinic: true
        }
      })

      return {
        user: {
          ...user,
          clinic: {
            id: clinic.clinicId,
            name: clinic.clinic.name,
            email: clinic.clinic.email
          }
        },
        session
      }
    })
    // end Plano Free
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema
  }),
  user: {
    modelName: 'usersTable'
  },
  session: {
    modelName: 'sessionsTable'
  },
  verification: {
    modelName: 'verificationsTable'
  },
  account: {
    modelName: 'accountsTable'
  }
});