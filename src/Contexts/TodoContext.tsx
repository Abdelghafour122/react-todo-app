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
import {
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import {
  AddTodoParamsType,
  EditTodoPayloadType,
  TodoContextValueType,
  UpdateTodoContentParamsType,
  CompletedTodoParamsType,
  DeletedTodoParamsType,
  ArchivedTodoParamsType,
} from "../Utils/types";

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
    await addDoc(todosCollection, params)
      .then((doc) => (documentId = doc.id))
      .catch((err) => {
        console.log("error while adding a todo, ");
        return err;
      });
    return documentId;
  };

  const permanentlyDeleteTodoItemFromDB = async (removeTodoId: string) => {
    const deleteTodoDocRef = doc(todoDatabase, "todos", removeTodoId);
    await deleteDoc(deleteTodoDocRef)
      .then(() => console.log("deleted successfuly"))
      .catch((err) => console.log("error while deleting todo.", err));
  };

  // CLEAN THIS UP CAUSE I WAS HALF ASLEEP WHEN I WROTE IT :')
  const updateTodoContentInDB = async (
    updateTodoContentInput: UpdateTodoContentParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoContentInput.id
    );
    await updateDoc(editTodoDocRef, {
      title: updateTodoContentInput.title,
      content: updateTodoContentInput.content,
    })
      .then(() => console.log("content updated successfuly"))
      .catch((err) => console.log("error while updating content.", err));
  };
  const setTodoCompletedInDB = async (
    updateTodoCompletedInput: CompletedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoCompletedInput.id
    );
    await updateDoc(editTodoDocRef, {
      completed: updateTodoCompletedInput.completed,
    })
      .then(() => console.log("updated todos completed state successfuly."))
      .catch((err) =>
        console.log("error while updating todos completed state", err)
      );
  };
  const setTodoDeletedInDB = async (
    updateTodoDeletedInput: DeletedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoDeletedInput.id
    );
    await updateDoc(editTodoDocRef, {
      deleted: updateTodoDeletedInput.deleted,
    })
      .then(() => console.log("updated todos deleted state successfuly."))
      .catch((err) =>
        console.log("error while updating todos deleted state", err)
      );
  };
  const archiveTodoInDB = async (
    updateTodoDeletedInput: ArchivedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoDeletedInput.id
    );
    await updateDoc(editTodoDocRef, {
      archived: updateTodoDeletedInput.archived,
    })
      .then(() => console.log("updated todos archived state successfuly."))
      .catch((err) =>
        console.log("error while updating todos archived state", err)
      );
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
      updateTodoContentInDB({
        id: todoItemId,
        title: todoItemTitle,
        content: todoItemContent,
      } as UpdateTodoContentParamsType);
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
      setTodoDeletedInDB({
        id: todoItemId,
        deleted: true,
      } as DeletedTodoParamsType);
      dispatch({
        type: actions.REMOVE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    permanentlyRemoveTodoItem: ({ id: todoItemId }) => {
      permanentlyDeleteTodoItemFromDB(todoItemId as string);
      dispatch({
        type: actions.PERMANENTLY_REMOVE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    restoreTodoItem: ({ id: todoItemId }) => {
      setTodoDeletedInDB({
        id: todoItemId,
        deleted: false,
      } as DeletedTodoParamsType);
      dispatch({
        type: actions.RESTORE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    markAsCompleted: ({ id: todoItemId, completed: todoItemCompleted }) => {
      setTodoCompletedInDB({
        id: todoItemId,
        completed: todoItemCompleted,
      } as CompletedTodoParamsType);
      dispatch({
        type: actions.TOGGLE_COMPLETED,
        payload: { id: todoItemId },
      });
    },
    archiveTodoItem: ({ id: todoItemId, archived: todoItemArchived }) => {
      archiveTodoInDB({
        id: todoItemId,
        archived: todoItemArchived,
      });
      dispatch({
        type: actions.ARCHIVE_TODO_ITEM,
        payload: { id: todoItemId, archived: todoItemArchived },
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
