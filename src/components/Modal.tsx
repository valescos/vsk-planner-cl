import { createPortal } from "react-dom";
import { useModalContext } from "../contexts/ModalContext";
import { useRef } from "react";
import TodoForm from "./TodoForm";

const portal: Element | null = document.getElementById("portal");

export default function Modal() {
  const { modalStatus, setModalStatus, setCurrentTodo } = useModalContext();
  const outerDivRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === outerDivRef.current) {
      setModalStatus("closed");
      setCurrentTodo(null);
    } else {
      return;
    }
  }

  if (modalStatus === "closed") return null;

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
