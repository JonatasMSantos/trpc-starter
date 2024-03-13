import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.NEON_DATABASE_URL!);

export const db = drizzle(sql);