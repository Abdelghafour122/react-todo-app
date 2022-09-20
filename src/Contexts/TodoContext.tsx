import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import { TodoContextValueType } from "../Utils/types";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextValueType>(
  {} as TodoContextValueType
);

export function useTodoContext() {
  return useContext(TodosContext);
}

const TodoContext = ({ children }: TodoContextProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);
  const contextValue: TodoContextValueType = {
    todoList: state,
    addTodoItem: ({ title: todoItemTitle, content: todoItemContent }) => {
      dispatch({
        type: actions.ADD_TODO_ITEM,
        payload: { title: todoItemTitle, content: todoItemContent },
      });
    },
    editTodoItem: ({
      id: todoItemId,
      title: todoItemTitle,
      content: todoItemContent,
    }) => {
      dispatch({
        type: actions.ADD_TODO_ITEM,
        payload: {
          id: todoItemId,
          title: todoItemTitle,
          content: todoItemContent,
        },
      });
    },
    removeTodoItem: ({ id: todoItemId }) => {
      dispatch({
        type: actions.REMOVE_TODO_ITEM,
        payload: { id: todoItemId as number },
      });
    },
    markAsCompleted: ({ id: todoItemId }) => {
      dispatch({
        type: actions.TOGGLE_COMPLETED,
        payload: { id: todoItemId as number },
      });
    },
  };
  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoContext;