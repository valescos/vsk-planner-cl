import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { Todo } from "../types";
import { useModalStatusStore } from "../store/store";

const base_url = import.meta.env.VITE_APP_SERVERURL;

export default function useServer() {
  const queryClient = useQueryClient();
  const [cookies, _, __] = useCookies();
  const setCurrentModalStatus = useModalStatusStore(
    (state) => state.setCurrentModalStatus,
  );

  const { isError, isFetching, data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      return fetch(`${base_url}/todos/${cookies.Email}`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err));
    },
  });

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
        .then(() => setCurrentModalStatus("closed"))
        .catch((err) => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: async (todoData: Todo) => {
      return fetch(`${base_url}/todos/${todoData.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...todoData,
        }),
      })
        .then(() => setCurrentModalStatus("closed"))
        .catch((err) => console.log(err));
    },
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
    isFetching,
    todos: data,
    addTodoMutation,
    editTodoMutation,
    deleteTodoMutation,
  };
}
