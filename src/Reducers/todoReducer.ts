import { Actions, Todos } from "../Utils/types";
import { actions } from "./todoReducerActionsState";

export const todoReducer = (
  state: Todos,
  { type, payload }: Actions
): Todos => {
  switch (type) {
    case actions.FETCH_TODO_ITEM:
      return [...(payload.fetchedData as Todos)];

    case actions.ADD_TODO_ITEM:
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 1000000).toString(),
          title: payload.title as string,
          content: payload.content as string,
          completed: false,
          deleted: false,
          archived: false,
        },
      ];

    case actions.EDIT_TODO_ITEM:
      return [
        ...state.map((todo) =>
          payload.id === todo.id
            ? {
                ...todo,
                title: payload.title as string,
                content: payload.content as string,
              }
            : todo
        ),
      ];

    case actions.REMOVE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id ? { ...todo, deleted: true } : todo
        ),
      ];

    case actions.RESTORE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id ? { ...todo, deleted: false } : todo
        ),
      ];

    case actions.PERMANENTLY_REMOVE_TODO_ITEM:
      return [...state.filter((todo) => todo.id !== payload.id)];

    case actions.TOGGLE_COMPLETED:
      return [
        ...state.map((todo) =>
          todo.id === payload.id
            ? todo.completed === true
              ? { ...todo, completed: false }
              : { ...todo, completed: true }
            : todo
        ),
      ];

    case actions.ARCHIVE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id && todo.deleted === false
            ? todo.archived === true
              ? { ...todo, archived: false }
              : { ...todo, archived: true }
            : todo
        ),
      ];

    default:
      return state;
  }
};
