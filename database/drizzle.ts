import { drizzle } from "drizzle-orm/better-sqlite3"

export const db = drizzle({ connection: process.env.DB_FILE_NAME || "", casing: "snake_case" })
