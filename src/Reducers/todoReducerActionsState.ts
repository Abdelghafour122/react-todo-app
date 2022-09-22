import { InitialReducerStateType, Todos } from "../Utils/types";

export const initialState: InitialReducerStateType = {
  todoList: [] as Todos,
};

export const actions = {
  ADD_TODO_ITEM: "ADD_TODO_ITEM",
  EDIT_TODO_ITEM: "EDIT_TODO_ITEM",
  REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
  PERMANENTLY_REMOVE_TODO_ITEM: "PERMANENTLY_REMOVE_TODO_ITEM",
  RESTORE_TODO_ITEM: "RESTORE_TODO_ITEM",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
  ARCHIVE_TODO_ITEM: "ARCHIVE_TODO_ITEM",
};
