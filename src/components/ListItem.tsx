import { BadgeCheck, BadgeX, BadgeMinus, Pencil } from "lucide-react";

import { Todo } from "../types";

import { cn } from "../utilities";

import StyledButton from "./StyledButton";
import ProgressBar from "./ProgressBar";
import useServer from "../hooks/useServer";
import { useCurrentTodoStore, useModalStatusStore } from "../store/store";

export default function ListItem({
  id,
  user_email,
  title,
  progress,
  date,
}: Todo) {
  const setCurrentModalStatus = useModalStatusStore(
    (state) => state.setCurrentModalStatus,
  );
  const { deleteTodoMutation, editTodoMutation } = useServer();

  const currentTodo = useCurrentTodoStore((state) => state.currentTodo);
  const setCurrentTodo = useCurrentTodoStore((state) => state.setCurrentTodo);

  const isComplited = progress === 100;

  function handleEditClick() {
    setCurrentModalStatus("edit");
    setCurrentTodo({
      id,
      user_email,
      title,
      progress,
      date,
    });
  }

  function handleCompliteUnlockTaskClick(value: number) {
    editTodoMutation.mutate({
      id,
      user_email,
      title,
      progress: value,
      date,
    });
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-md border-[1px] border-gray-400 p-2 transition-all sm:justify-between",
        isComplited && "bg-blue-200 opacity-50",
        currentTodo?.id === id && "bg-gray-200",
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="hidden sm:block">
          {isComplited ? (
            <StyledButton
              title="Разблокировать"
              type="button"
              onClick={() => handleCompliteUnlockTaskClick(99)}
            >
              <BadgeMinus />
            </StyledButton>
          ) : (
            <StyledButton
              title="Выполнить"
              type="button"
              onClick={() => handleCompliteUnlockTaskClick(100)}
            >
              <BadgeCheck />
            </StyledButton>
          )}
        </div>
        <p className="pt-4 text-lg font-light sm:pt-0">{title}</p>
      </div>
      <div className="absolute -top-[35%] left-[50%] flex -translate-x-[50%] items-center gap-2 sm:relative sm:left-0 sm:translate-x-0">
        <div className="block sm:hidden">
          {isComplited ? (
            <StyledButton
              title="Разблокировать"
              type="button"
              onClick={() => handleCompliteUnlockTaskClick(99)}
            >
              <BadgeMinus />
            </StyledButton>
          ) : (
            <StyledButton
              title="Выполнить"
              type="button"
              onClick={() => handleCompliteUnlockTaskClick(100)}
            >
              <BadgeCheck />
            </StyledButton>
          )}
        </div>

        <ProgressBar progress={progress} />

        <StyledButton
          disabled={isComplited}
          title="Редактировать"
          type="button"
          onClick={() => handleEditClick()}
        >
          <Pencil />
        </StyledButton>
        <StyledButton
          title="Удалить"
          type="button"
          onClick={() => {
            deleteTodoMutation.mutate(id);
          }}
        >
          <BadgeX />
        </StyledButton>
      </div>
    </div>
  );
}
