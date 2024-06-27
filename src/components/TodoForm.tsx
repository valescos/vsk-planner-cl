import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useServer from "../hooks/useServer";

import { Todo } from "../types";

import { PulseLoader } from "react-spinners";
import { useCurrentTodoStore, useModalStatusStore } from "../store/store";

export default function TodoForm() {
  const currentModalStatus = useModalStatusStore(
    (state) => state.currentModlStatus,
  );
  const [cookies, _, __] = useCookies();
  const { editTodoMutation, addTodoMutation } = useServer();
  const currentTodo = useCurrentTodoStore((state) => state.currentTodo);

  const editMode = currentModalStatus === "edit";

  function handleInput(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todoData: Todo,
  ) {
    e.preventDefault();
    editMode
      ? editTodoMutation.mutate(todoData)
      : addTodoMutation.mutate(todoData);
  }

  const [todoData, setTodoData] = useState<Todo>({
    id: "",
    user_email: cookies.Email,
    title: "",
    progress: 0,
    date: "",
  });

  useEffect(() => {
    if (editMode && currentTodo) {
      setTodoData({
        id: currentTodo.id,
        user_email: currentTodo.user_email,
        title: currentTodo.title,
        progress: currentTodo.progress,
        date: currentTodo.date,
      });
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoData((prevTodoData) => ({
      ...prevTodoData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form className="flex flex-col gap-6 p-6">
      <h2 className="text-center text-2xl">
        {currentModalStatus === "create"
          ? "Новая задача"
          : "Редактирование задачи"}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Что сделать:</label>
        <input
          name="title"
          className="rounded-lg border-2 border-gray-400 px-4 py-2"
          type="text"
          id="title"
          required
          maxLength={30}
          onChange={(e) => handleChange(e)}
          value={todoData.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="progress">Прогресс: {todoData.progress}%</label>
        <input
          name="progress"
          type="range"
          id="progress"
          min={0}
          max={100}
          value={todoData.progress}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        className="rounded-md border-2 border-gray-400 bg-gray-200 p-2 text-gray-400 transition-all hover:bg-gray-400 hover:text-white"
        type="submit"
        onClick={(e) => handleInput(e, todoData)}
      >
        {editTodoMutation.isPending || addTodoMutation.isPending ? (
          <PulseLoader color="#FFF" size={10} />
        ) : (
          "Отправить"
        )}
      </button>
    </form>
  );
}
