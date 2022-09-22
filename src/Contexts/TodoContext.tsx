import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import { TodoContextValueType, Todos } from "../Utils/types";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextValueType>(
  {} as TodoContextValueType
);

export function useTodoContext() {
  return useContext(TodosContext);
}

const DUMMY_DATA: Todos = [
  {
    id: 3423235235,
    title: "bullshit",
    content: "amfjejfmoajefojaef",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 3423,
    title: "bullshizazat",
    content: "amfjejdazazdazazfmoajefojaef",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 34232,
    title: "bullsh azdazd ait",
    content: "amfjejzaz a za fmoajefojaef",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 342323,
    title: "bullshfazfafe e afit",
    content: "amfjejfm adae a afaef oajefojaef",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 3423235,
    title: "bullshit crap",
    content: "amfjejfmoajefojaef ckuefkuzefuzgef gdgazgiu",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 34232352,
    title: "bullshitfzefze ezfzfe",
    content: "amfjejfmoajefojae fefafa eafef",
    completed: false,
    deleted: false,
    archived: false,
  },
  {
    id: 342323523,
    title: "bullshi aefeaft",
    content: "amfjejfmoajefoj eeeee  a aeaeeaef",
    completed: false,
    deleted: false,
    archived: false,
  },
];

const TodoContext = ({ children }: TodoContextProps) => {
  const [state, dispatch] = useReducer(todoReducer, DUMMY_DATA); //initialState.todoList

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
        payload: { id: todoItemId as number },
      });
    },
    permanentlyRemoveTodoItem: ({ id: todoItemId }) => {
      dispatch({
        type: actions.PERMANENTLY_REMOVE_TODO_ITEM,
        payload: { id: todoItemId as number },
      });
    },
    markAsCompleted: ({ id: todoItemId }) => {
      dispatch({
        type: actions.TOGGLE_COMPLETED,
        payload: { id: todoItemId as number },
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
