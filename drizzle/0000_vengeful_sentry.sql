CREATE TABLE IF NOT EXISTS "payment" (
	"id" integer PRIMARY KEY NOT NULL,
	"due_date" timestamp (6) with time zone,
	"title" text NOT NULL,
	"note" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
