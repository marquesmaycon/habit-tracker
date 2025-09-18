import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core"

const timestamps = {
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}

export const habits = sqliteTable("habits", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  ...timestamps,
})

export const habitWeekDays = sqliteTable(
  "habit_week_days",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    habitId: integer("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    weekDay: integer("week_day").notNull(),
    ...timestamps,
  },
  (table) => ({
    uniqueHabitWeekDay: unique().on(table.habitId, table.weekDay),
  }),
)

export const days = sqliteTable("days", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull().unique(),
})

export const dayHabits = sqliteTable(
  "day_habits",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    dayId: integer("day_id")
      .notNull()
      .references(() => days.id, { onDelete: "cascade" }),
    habitId: integer("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => ({
    uniqueDayHabit: unique().on(table.dayId, table.habitId),
  }),
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
