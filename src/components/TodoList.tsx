"use client";

import { trpc } from "@/utils/trpc";

interface TodoListProps {}
export const TodoList = ({}: TodoListProps) => {
  const getTodos = trpc.getTodos.useQuery();

  return <>{JSON.stringify(getTodos.data)}</>;
};
export default TodoList;
