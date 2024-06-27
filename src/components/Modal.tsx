import { createPortal } from "react-dom";
import { useRef } from "react";
import TodoForm from "./TodoForm";
import { useCurrentTodoStore, useModalStatusStore } from "../store/store";

const portal: Element | null = document.getElementById("portal");

export default function Modal() {
  const { currentModalStatus, setCurrentModalStatus } = useModalStatusStore(
    (state) => ({
      currentModalStatus: state.currentModlStatus,
      setCurrentModalStatus: state.setCurrentModalStatus,
    }),
  );
  const outerDivRef = useRef<HTMLDivElement | null>(null);
  const setCurrentTodo = useCurrentTodoStore((state) => state.setCurrentTodo);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === outerDivRef.current) {
      setCurrentModalStatus("closed");
      setCurrentTodo(null);
    } else {
      return;
    }
  }

  if (currentModalStatus === "closed") return null;

  return (
    portal &&
    createPortal(
      <div
        ref={outerDivRef}
        className="fixed z-20 flex h-full w-full items-start justify-center bg-[rgba(0,0,0,0.5)] md:items-center"
        onClick={(e) => handleClickOutside(e)}
      >
        <div className="z-30 mt-16 w-[75%] rounded-md bg-white shadow-md md:mt-0 md:w-[50%] lg:w-[25%]">
          <TodoForm />
        </div>
      </div>,
      portal,
    )
  );
}
