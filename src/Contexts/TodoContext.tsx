import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import { AddTodoParamsType, TodoContextValueType } from "../Utils/types";

import { getTodosList } from "../Utils/firestore";
import { app } from "../firebase";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextValueType>(
  {} as TodoContextValueType
);

export function useTodoContext() {
  return useContext(TodosContext);
}

export const todoDatabase = getFirestore(app);
const todosCollection = collection(todoDatabase, "todos");

const TodoContext = ({ children }: TodoContextProps) => {
  const todoItemIdRef = useRef<string>("");
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);

  const addTodoItemToDB = async (params: AddTodoParamsType) => {
    let documentId = "";
    await addDoc(todosCollection, params).then((doc) => (documentId = doc.id));
    return documentId;
  };

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
    addTodoItem: async ({ title: todoItemTitle, content: todoItemContent }) => {
      await addTodoItemToDB({
        title: todoItemTitle,
        content: todoItemContent as string,
        completed: false,
        archived: false,
        deleted: false,
      }).then((res) => (todoItemIdRef.current = res));
      dispatch({
        type: actions.ADD_TODO_ITEM,
        payload: {
          id: todoItemIdRef.current,
          title: todoItemTitle,
          content: todoItemContent,
        },
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
