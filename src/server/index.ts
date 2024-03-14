import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { payment } from "@/db/schema";
import { publicProcedure, router } from "./trpc";

export const InsertValidator = z.object({
  id: z.string().optional(),
  title: z.string(),
  note: z.string(),
  done: z.boolean().default(false),
});

export const UpdateValidator = z.object({
  id: z.string(),
  done: z.boolean(),
});

export const appRouter = router({
  getPayments: publicProcedure.query(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await db.select().from(payment);
  }),

  addPayment: publicProcedure.input(InsertValidator).mutation(async (opts) => {
    await db.insert(payment).values(opts.input);
    return true;
  }),

  setDone: publicProcedure.input(UpdateValidator).mutation(async (opts) => {
    await db
      .update(payment)
      .set({ done: opts.input.done })
      .where(eq(payment.id, opts.input.id));
    return true;
  }),
});

export type AppRouter = typeof appRouter;
