import { Actions, Todos } from "../Utils/types";
import { actions } from "./todoReducerActionsState";

// export const todoReducer = (state: Todos, action: Actions) => {
export const todoReducer = (
  state: Todos,
  { type, payload }: Actions
): Todos => {
  //   switch (action.type) {
  switch (type) {
    // case actions.ADD_TODO_ITEM:
    //   return {
    //     state: [
    //       ...state,
    //       { id: 1222, content: "what the fuck", completed: false },
    //     ],
    //   };

    case actions.ADD_TODO_ITEM:
      return [
        ...state,
        { id: 1222, content: payload.content as string, completed: false },
      ];

    case actions.EDIT_TODO_ITEM:
      return [
        ...state.map((todo) =>
          payload.id === todo.id
            ? { ...todo, content: payload.content as string }
            : todo
        ),
      ];

    case actions.REMOVE_TODO_ITEM:
      return [...state.filter((todo) => todo.id !== payload.id)];

    case actions.TOGGLE_COMPLETED:
      return [
        ...state.map((todo) =>
          todo.id === payload.id ? { ...todo, completed: true } : todo
        ),
      ];

    default:
      return state;
  }
};
