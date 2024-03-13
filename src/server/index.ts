import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { payment } from "@/db/schema";
import { publicProcedure, router } from "./trpc";

export const PaymentValidator = z.object({
    id: z.number(),
    due_date: z.date().nullable().optional(),
    title: z.string(),
    note: z.string(),
    done: z.boolean().default(false),
  });

export const appRouter = router({
  getPayments: publicProcedure.query(async () => {
    return await db.select().from(payment)
  }),
  addTodo: publicProcedure.input(PaymentValidator).mutation(async (opts) => {
    await db.insert(payment).values(opts.input)
    return true;
  }),

  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      await db
        .update(payment)
        .set({ done: opts.input.done })
        .where(eq(payment.id, opts.input.id))
      return true;
    }),
});

export type AppRouter = typeof appRouter;