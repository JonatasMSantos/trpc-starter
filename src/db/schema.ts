import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const payment = pgTable("payment", {
  id: integer("id").primaryKey(),
  due_date: timestamp('due_date', { precision: 6, withTimezone: true }),
  title: text("title").notNull(),
  note: text("note").notNull(),
  done: boolean("done").default(false).notNull(),
}); 

