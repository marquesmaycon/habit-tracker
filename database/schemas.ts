import { relations, sql } from "drizzle-orm"
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core"

const timestamps = {
  // createdAt: text("created_at").default(sql`CURRENT_DATE`).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  ...timestamps,
})

export const habitWeekDays = pgTable(
  "habit_week_days",
  {
    id: serial("id").primaryKey(),
    habitId: integer("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    weekDay: integer("week_day").notNull(),
    ...timestamps,
  },
  (table) => [unique().on(table.habitId, table.weekDay)],
)

export const days = pgTable("days", {
  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(),
})

export const dayHabits = pgTable(
  "day_habits",
  {
    id: serial("id").primaryKey(),
    dayId: integer("day_id")
      .notNull()
      .references(() => days.id, { onDelete: "cascade" }),
    habitId: integer("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [unique().on(table.dayId, table.habitId)],
)

// Definindo as relações
export const habitsRelations = relations(habits, ({ many }) => ({
  weekDays: many(habitWeekDays),
  dayHabits: many(dayHabits),
}))

export const habitWeekDaysRelations = relations(habitWeekDays, ({ one }) => ({
  habit: one(habits, {
    fields: [habitWeekDays.habitId],
    references: [habits.id],
  }),
}))

export const dayHabitsRelations = relations(dayHabits, ({ one }) => ({
  habit: one(habits, {
    fields: [dayHabits.habitId],
    references: [habits.id],
  }),
  day: one(days, {
    fields: [dayHabits.dayId],
    references: [days.id],
  }),
}))

export const daysRelations = relations(days, ({ many }) => ({
  dayHabits: many(dayHabits),
}))
