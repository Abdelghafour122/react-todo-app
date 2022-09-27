import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { todoDatabase } from "../firebase";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import { TodoContextValueType } from "../Utils/types";

import { getTodosList } from "../Utils/firestore";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextValueType>(
  {} as TodoContextValueType
);

export function useTodoContext() {
  return useContext(TodosContext);
}

// const todosCollection = collection(todoDatabase, "todos");

const TodoContext = ({ children }: TodoContextProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);

  const contextValue: TodoContextValueType = {
    todoList: state,
    fetchTodoItems: useCallback(async () => {
      await getTodosList().then((res) => {
        dispatch({
          type: actions.FETCH_TODO_ITEM,
          payload: { fetchedData: res },
        });
      });
    }, []),
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
        type: actions.EDIT_TODO_ITEM,
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
        payload: { id: todoItemId },
      });
    },
    permanentlyRemoveTodoItem: ({ id: todoItemId }) => {
      dispatch({
        type: actions.PERMANENTLY_REMOVE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    restoreTodoItem: ({ id: todoItemId }) => {
      dispatch({
        type: actions.RESTORE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    markAsCompleted: ({ id: todoItemId }) => {
      dispatch({
        type: actions.TOGGLE_COMPLETED,
        payload: { id: todoItemId },
      });
    },
    archiveTodoItem: ({ id: todoItemId, deleted: todoItemDeleted }) => {
      dispatch({
        type: actions.ARCHIVE_TODO_ITEM,
        payload: { id: todoItemId, deleted: todoItemDeleted },
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
