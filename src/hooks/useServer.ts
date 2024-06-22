import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useModalContext } from "../contexts/ModalContext";

import { Todo } from "../types";
import { useMemo } from "react";

const base_url = import.meta.env.VITE_APP_SERVERURL;

export default function useServer() {
  const queryClient = useQueryClient();
  const [cookies, _, __] = useCookies();
  const { setModalStatus } = useModalContext();

  const { isError, isLoading, data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch(`${base_url}/todos/${cookies.Email}`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err)),
  });

  const isListEmpty = useMemo(() => {
    return data?.length === 0;
  }, [data]);

  const addTodoMutation = useMutation({
    mutationFn: (todoData: Todo) =>
      fetch(`${base_url}/todos`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...todoData,
          date: new Date(),
        }),
      })
        .then(() => setModalStatus("closed"))
        .catch((err) => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: (todoData: Todo) =>
      fetch(`${base_url}/todos/${todoData.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...todoData,
        }),
      })
        .then(() => setModalStatus("closed"))
        .catch((err) => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`${base_url}/todos/${id}`, {
        method: "DELETE",
      })
        .then(() => {})
        .catch((err) => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    isError,
    isLoading,
    todos: data,
    addTodoMutation,
    editTodoMutation,
    deleteTodoMutation,
    isListEmpty,
  };
}
