import { create } from "zustand";
import { Todo } from "../types";

type CurrentTodoState = {
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo | null) => void;
};

export const useCurrentTodoStore = create<CurrentTodoState>()((set) => ({
  currentTodo: null,
  setCurrentTodo: (todo) => set({ currentTodo: todo }),
}));

type ModalStatus = "edit" | "create" | "closed";

type ModalStatusState = {
  currentModlStatus: ModalStatus;
  setCurrentModalStatus: (status: ModalStatus) => void;
};

export const useModalStatusStore = create<ModalStatusState>()((set) => ({
  currentModlStatus: "closed",
  setCurrentModalStatus: (status) => set({ currentModlStatus: status }),
}));
