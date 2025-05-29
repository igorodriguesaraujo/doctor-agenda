import { db } from "@/lib/drizzle";
import { betterAuth } from "better-auth";
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