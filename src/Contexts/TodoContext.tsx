import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import { TodoContextType } from "../Utils/types";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextType>({} as TodoContextType);

export function useTodoContext() {
  return useContext(TodosContext);
}

const TodoContext = ({ children }: TodoContextProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);
  const contextValue = {
    dispatch: dispatch,
    todoList: state,
    addTodoItem: (todoItemContent: string) => {
      dispatch({ type: actions.ADD_TODO_ITEM, payload: todoItemContent });
    },
    removeTodoItem: (todoItemId: number) => {
      dispatch({ type: actions.REMOVE_TODO_ITEM, payload: todoItemId });
    },
    markAsCompleted: (todoItemId: number) => {
      dispatch({ type: actions.TOGGLE_COMPLETED, payload: todoItemId });
    },
  };
  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoContext;
