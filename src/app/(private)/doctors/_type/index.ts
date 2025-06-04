import z from "zod";

export const schemaDoctor = z
  .object({
    name: z.string().trim().min(1, {
      message: 'Campo obrigatório'
    }),
    specialty: z.string().trim().min(1, {
      message: 'Campo Obrigatório'
    }),
    appointmentPrice: z.number().min(1, {
      message: 'Campo obrigatório'
    }),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().min(1, {
      message: 'Campo obrigatório'
    }),
    availableToTime: z.string().min(1, {
      message: 'Campo obrigatório'
    }),
  })
  .refine(({
    availableFromTime,
    availableToTime
  }) => {
    return availableFromTime < availableToTime
  }, {
    message: 'O Horário de inicio não pode ser anterior ao horário final',
    path: ['availableToTime']
  });

export type FormDataDoctor = z.infer<typeof schemaDoctor>;