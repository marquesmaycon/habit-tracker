import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const timestamps = {
  createdAt: text()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
}

export const habits = sqliteTable("habits", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  ...timestamps
})

export const habitWeekdays = sqliteTable("habit_weekdays", {
  id: integer().primaryKey({ autoIncrement: true }),
  habitId: integer()
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  weekday: integer().notNull(),
  ...timestamps
})

export const dayHabits = sqliteTable("day_habits", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  habitId: integer()
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  ...timestamps
})
