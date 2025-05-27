import { relations } from "drizzle-orm";
import { pgTable, uuid, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

// Create table Clinic
export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const userTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable)
}))

// Create table pivot users to clinics
export const usersToClinicsTable = pgTable('users_to_clinics', {
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
})

export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id]
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id]
    })
  })
)

// Create Table Doctor
export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  avatarImageURL: text("avatar_image_url").notNull(),
  availableFromWeekDay: integer('available_from_week_day').notNull(),
  availableToWeekDay: integer('available_to_week_day').notNull(),
  availableFromTime: integer('available_from_time').notNull(),
  availableToTime: integer('available_to_time').notNull(),
  specialty: text('specialty').notNull(),
  appointmentPriceInCents: integer('appointment_price_in_cents').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
});

// Create Table Patients
export const patientsSexEnum = pgEnum("patient_sex", ['male', 'female']);

export const patientsTable = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  sex: patientsSexEnum('sex').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

// Create Table Appointment
export const appointmentsTable = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').notNull(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id),
  patientId: uuid('patient_id')
    .notNull()
    .references(() => patientsTable.id),
  doctorId: uuid('doctor_id')
    .notNull()
    .references(() => doctorsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

// Create Table Clinic Relations
export const clinicTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinics: many(usersToClinicsTable),
}))

// Create Table Doctor Relations
export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id]
  })
}))

// Create Table patients Relations
export const patientsTableRelations = relations(patientsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [patientsTable.clinicId],
    references: [clinicsTable.id]
  })
}))

// Create table appointment relations
export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [appointmentsTable.clinicId],
    references: [clinicsTable.id]
  }),
  doctor: one(doctorsTable, {
    fields: [appointmentsTable.doctorId],
    references: [doctorsTable.id]
  }),
  patient: one(patientsTable, {
    fields: [appointmentsTable.patientId],
    references: [patientsTable.id]
  })
}))
