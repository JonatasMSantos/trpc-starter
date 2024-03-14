ALTER TABLE "payment" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN IF EXISTS "due_date";