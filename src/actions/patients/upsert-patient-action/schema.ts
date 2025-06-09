import { z } from "zod";

export const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Campo Obrigatório' }),
  email: z.string().email('E-mail invalido').min(1, { message: 'Campo Obrigatório' }),
  phone: z.string().min(1, { message: 'Campo Obrigatório' }),
  sex: z.union([z.literal('female'), z.literal('male')])
})