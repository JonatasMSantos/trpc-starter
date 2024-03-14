"use client";

import { trpc } from "@/lib/trpc/client";
import { serverClient } from "@/lib/trpc/server";
import { useState } from "react";

type PaymentType = Awaited<ReturnType<(typeof serverClient)["getPayments"]>>;

interface PaymentListProps {
  initialPayments: PaymentType;
}
export const PaymentList = ({ initialPayments }: PaymentListProps) => {
  const getPayments = trpc.getPayments.useQuery(undefined, {
    initialData: initialPayments,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addPayment = trpc.addPayment.useMutation({
    onSettled: () => {
      getPayments.refetch();
    },
  });

  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getPayments.refetch();
    },
  });

  const add = (content: string) => {
    addPayment.mutate({ title: content, note: "" });
  };

  const [content, setContent] = useState("");

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {getPayments?.data?.map((payment) => (
          <div key={payment.id} className="flex gap-3 items-center">
            <input
              id={`check-${payment.id}`}
              type="checkbox"
              checked={!!payment.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: payment.id,
                  done: !payment.done,
                });
              }}
            />
            <label htmlFor={`check-${payment.id}`}>{payment.title}</label>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (content.length) {
              add(content);
              setContent("");
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Payment
        </button>
      </div>
    </div>
  );
};
export default PaymentList;
