import 'dotenv/config'
import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";

import { auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [customSessionClient<typeof auth>()]
})