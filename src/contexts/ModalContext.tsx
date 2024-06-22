import React, { createContext, useContext, useState } from "react";
import { Todo } from "../types";

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalStatus = "edit" | "create" | "closed";

type ModalContext = {
  modalStatus: ModalStatus;
  setModalStatus: React.Dispatch<React.SetStateAction<ModalStatus>>;
  currentTodo: Todo | null;
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

const ModalContext = createContext<ModalContext | null>(null);

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [modalStatus, setModalStatus] = useState<ModalStatus>("closed");
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return (
    <ModalContext.Provider
      value={{ modalStatus, setModalStatus, currentTodo, setCurrentTodo }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be within ModalContextProvider");
  }

  return context;
}
