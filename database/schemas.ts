import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { main } from "./seeder"

const timestamps = {
  createdAt: text("created_at")
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
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  weekday: integer().notNull(),
  ...timestamps
})

export const habitDays = sqliteTable("habit_days", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  ...timestamps
})

main()