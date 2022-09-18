import { Actions, Todos } from "../Utils/types";
import { actions } from "./todoReducerActionsState";

// export const todoReducer = (state: Todos, action: Actions) => {
export const todoReducer = (state: Todos, { type, payload }: Actions) => {
  //   switch (action.type) {
  switch (type) {
    case actions.ADD_TODO_ITEM:
      return {
        state: [
          ...state,
          { id: 1222, content: "what the fuck", completed: false },
        ],
      };

    case actions.EDIT_TODO_ITEM:
      return state;

    case actions.REMOVE_TODO_ITEM:
      return state;

    case actions.TOGGLE_COMPLETED:
      return state;

    default:
      return state;
  }
};
