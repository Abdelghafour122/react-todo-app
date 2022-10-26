import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import {
  AddTodoParamsType,
  TodoContextValueType,
  UpdateTodoContentParamsType,
  CompletedTodoParamsType,
  DeletedTodoParamsType,
  ArchivedTodoParamsType,
  AddLabelParamsType,
  UpdateLabelContentParamsType,
  Labels,
  AddLabelToTodoInput,
} from "../Utils/types";

import { getLabelsList, getTodosList } from "../Utils/firestore";
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
const labelsCollection = collection(todoDatabase, "labels");

const TodoContext = ({ children }: TodoContextProps) => {
  const todoItemIdRef = useRef<string>("");
  const labelIdRef = useRef<string>("");
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);

  const [LabelsList, setLabelsList] = useState<Labels>([]);

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

  // LABEL RELATED FUNCS
  const addLabelToDB = async (params: AddLabelParamsType) => {
    let documentId = "";
    await addDoc(labelsCollection, params)
      .then((doc) => (documentId = doc.id))
      .catch((err) => {
        console.log("error while adding a label.");
        return err;
      });
    return documentId;
  };
  const deleteLabelFromDB = async (removeLabelId: string) => {
    const deleteLabelDocRef = doc(todoDatabase, "labels", removeLabelId);
    await deleteDoc(deleteLabelDocRef)
      .then(() => console.log("deleted successfuly"))
      .catch((err) => console.log("error while deleting label.", err));
  };
  const editLabelInDB = async (
    updateLabelContentInput: UpdateLabelContentParamsType
  ) => {
    const editLabelDocRef = doc(
      todoDatabase,
      "labels",
      updateLabelContentInput.id
    );
    await updateDoc(editLabelDocRef, {
      name: updateLabelContentInput.name,
      count: updateLabelContentInput.count,
    })
      .then(() => console.log("label content updated successfuly"))
      .catch((err) => console.log("error while updating label content.", err));
  };

  // FIND TODO & RETURN THE TODOS LABELS ARRAY
  const getLabelsListOfTodo = (todosId: string) => {
    let curLabels = [] as Labels;
    state.forEach((todo) => {
      if (todo.id === todosId) curLabels = todo.labels;
    });
    return curLabels;
  };

  console.log("just checking:", getLabelsListOfTodo("CdjQI4ODCKlWy3hEhFJw"));

  // MANAGE LABELS IN A TODO
  const addLabelToTodo = async (addLabelToTodoInput: AddLabelToTodoInput) => {
    const addLabelToTodoDocRef = doc(
      todoDatabase,
      "todos",
      addLabelToTodoInput.todoId
    );
    await updateDoc(addLabelToTodoDocRef, {
      labels: [
        ...getLabelsListOfTodo(addLabelToTodoInput.todoId),
        {
          id: addLabelToTodoInput.id,
          name: addLabelToTodoInput.name,
          count: addLabelToTodoInput.count,
        },
      ],
    })
      .then(() => console.log("label added to todo successfuly"))
      .catch((err) => console.log("error while adding label to todo.", err));
  };
  const removeLabelFromTodo = async () => {};

  // CONTEXT VALUE OBJECT
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

    formatDate: (fetchedDate: Timestamp) => {
      return fetchedDate.toDate().toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },

    addTodoItem: async ({ title: todoItemTitle, content: todoItemContent }) => {
      await addTodoItemToDB({
        title: todoItemTitle,
        content: todoItemContent as string,
        completed: false,
        archived: false,
        deleted: false,
        edited: false,
        date: Timestamp.now(),
        labels: [],
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
      date: todoItemDate,
    }) => {
      updateTodoContentInDB({
        id: todoItemId,
        title: todoItemTitle,
        content: todoItemContent,
        edited: true,
        date: todoItemDate,
      } as UpdateTodoContentParamsType);
      dispatch({
        type: actions.EDIT_TODO_ITEM,
        payload: {
          id: todoItemId,
          title: todoItemTitle,
          content: todoItemContent,
          date: todoItemDate,
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

    labelsArray: LabelsList,
    fetchLabels: useCallback(async () => {
      await getLabelsList().then((res) => setLabelsList(res));
    }, []),
    addLabel: async ({ name: labelName }: AddLabelParamsType) => {
      await addLabelToDB({ name: labelName, count: 0 }).then(
        (res) => (labelIdRef.current = res)
      );
      setLabelsList([
        ...LabelsList,
        {
          id: labelIdRef.current,
          name: labelName,
          count: 0,
        },
      ]);
    },
    deleteLabel: (id: string) => {
      deleteLabelFromDB(id);
      setLabelsList([...LabelsList.filter((label) => label.id !== id)]);
    },
    editLabel: ({ id: labelId, name: labelName, count: labelCount }) => {
      editLabelInDB({ id: labelId, name: labelName, count: labelCount });
      setLabelsList([
        ...LabelsList.map((label) =>
          label.id === labelId
            ? {
                ...label,
                name: labelName as string,
                count: labelCount as number,
              }
            : label
        ),
      ]);
    },
    addLabelToTodoItem: async ({
      todoId: todoItemId,
      id: labelId,
      count: labelsCount,
      name: labelsName,
    }) => {
      await addLabelToTodo({
        id: labelId,
        count: labelsCount,
        name: labelsName,
        todoId: todoItemId,
      });
      editLabelInDB({
        id: labelId,
        count: labelsCount + 1,
        name: labelsName,
      });
      console.log("logging from context:", [
        ...getLabelsListOfTodo(todoItemId),
        { id: labelId, name: labelsName, count: labelsCount + 1 },
      ]);
      dispatch({
        type: actions.ADD_LABEL_TO_TODO_ITEM,
        payload: {
          id: todoItemId,
          labels: [
            ...getLabelsListOfTodo(todoItemId),
            { id: labelId, name: labelsName, count: labelsCount + 1 },
          ],
        },
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
