import { db } from "@/lib/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from '@/database/schema'

export const auth = betterAuth({
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