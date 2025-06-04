import z from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, { message: 'Campo obrigatório' }),
    specialty: z.string().trim().min(1, { message: 'Campo Obrigatório' }),
    appointmentPrice: z.number().min(1, { message: 'Campo obrigatório' }),
    availableFromWeekDay: z.number().min(1).max(6),
    availableToWeekDay: z.number().min(1).max(6),
    availableFromTime: z.string().min(1, { message: 'Campo obrigatório' }),
    availableToTime: z.string().min(1, { message: 'Campo obrigatório' }),
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

export type FormDataUpsertDoctor = z.infer<typeof upsertDoctorSchema>;