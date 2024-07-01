import { useCookies } from "react-cookie";
import useServer from "../hooks/useServer";
import { PulseLoader } from "react-spinners";
import { useCurrentTodoStore, useModalStatusStore } from "../store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TtodoFormSchema } from "../types";
import { todoFormSchema } from "../types";

export default function TodoForm() {
  const currentModalStatus = useModalStatusStore(
    (state) => state.currentModlStatus,
  );
  const setCurrentModalStatus = useModalStatusStore(
    (state) => state.setCurrentModalStatus,
  );
  const [cookies, _, __] = useCookies();
  const { editTodoMutation, addTodoMutation } = useServer();
  const currentTodo = useCurrentTodoStore((state) => state.currentTodo);
  const setCurrentTodo = useCurrentTodoStore((state) => state.setCurrentTodo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<TtodoFormSchema>({ resolver: zodResolver(todoFormSchema) });

  function onSubmit() {
    currentTodo
      ? editTodoMutation.mutate({
          id: currentTodo.id,
          user_email: currentTodo.user_email,
          title: getValues("title"),
          progress: getValues("progress"),
          date: currentTodo.date,
        })
      : addTodoMutation.mutate({
          id: "",
          user_email: cookies.Email,
          title: getValues("title"),
          progress: getValues("progress"),
          date: "",
        });

    setCurrentTodo(null);
    setCurrentModalStatus("closed");
  }

  return (
    <form className="flex flex-col gap-6 p-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-2xl">
        {currentModalStatus === "create"
          ? "Новая задача"
          : "Редактирование задачи"}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Что сделать:</label>
        <input
          {...register("title")}
          name="title"
          className="rounded-lg border-2 border-gray-400 px-4 py-2"
          type="text"
          id="title"
          defaultValue={currentTodo ? currentTodo.title : ""}
        />
        {errors.title && (
          <p className="self-center font-thin text-rose-500">{`${errors.title.message}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="progress">Прогресс: {watch("progress")}%</label>
        <input
          {...register("progress")}
          name="progress"
          type="range"
          id="progress"
          defaultValue={currentTodo ? currentTodo.progress : 0}
        />
        {errors.progress && (
          <p className="self-center font-thin text-rose-500">{`${errors.progress.message}`}</p>
        )}
      </div>
      <button
        className="rounded-md border-2 border-gray-400 bg-gray-200 p-2 text-gray-400 transition-all hover:bg-gray-400 hover:text-white"
        type="submit"
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
