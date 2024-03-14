import { appRouter } from "@/server";
import { initTRPC } from '@trpc/server';

const {createCallerFactory} = initTRPC.create();

export const serverClient = createCallerFactory(appRouter)(async () => {
})