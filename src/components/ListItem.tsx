import { BadgeCheck, BadgeX, BadgeMinus, Pencil } from "lucide-react";
import { useModalContext } from "../contexts/ModalContext";

import { Todo } from "../types";

import { cn } from "../utilities";

import StyledButton from "./StyledButton";
import ProgressBar from "./ProgressBar";
import useServer from "../hooks/useServer";

export default function ListItem({
  id,
  user_email,
  title,
  progress,
  date,
}: Todo) {
  const { setModalStatus, setCurrentTodo } = useModalContext();
  const { deleteTodoMutation, editTodoMutation } = useServer();

  const isComplited = progress === 100;

  function handleEditClick() {
    setModalStatus("edit");
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
        "flex items-center justify-between p-4 py-2 transition-all",
        isComplited && "bg-blue-200 opacity-50",
      )}
    >
      <div className="flex items-center gap-4 text-lg">
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
        <p className="font-light">{title}</p>
        <ProgressBar progress={progress} />
      </div>
      <div className="flex gap-2">
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
