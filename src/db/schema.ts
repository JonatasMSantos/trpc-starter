import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const payment = pgTable("payment", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text("title").notNull(),
  note: text("note").notNull(),
  done: boolean("done").default(false).notNull(),
}); 

