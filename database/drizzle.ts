import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schemas";

const sqlite = new Database(process.env.DB_FILE_NAME || "./database/db.sqlite");
export const db = drizzle(sqlite, {
  casing: "snake_case",
  schema,
});
