import "dotenv/config";
import { defineConfig } from "prisma/config";

// Fallback so `prisma generate` works on Vercel even before DATABASE_URL is wired
// for migrations. Runtime still requires a real DATABASE_URL.
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
