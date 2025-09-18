import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schemas.ts",
  out: "./database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME || "",
  },
});
