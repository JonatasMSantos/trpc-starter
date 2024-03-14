import PaymentList from "@/components/PaymentList";
import { serverClient } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const payments = await serverClient.getPayments();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PaymentList initialPayments={payments} />
    </main>
  );
}
