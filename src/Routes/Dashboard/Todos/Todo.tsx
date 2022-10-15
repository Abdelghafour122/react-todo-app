import React, { useState } from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";
import { FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { ImEnlarge2 } from "react-icons/im";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import {
  EditTodoParamsType,
  DetailedTodoType,
  Todo as TodoType,
} from "../../../Utils/types";
import DetailedTodoBackdrop from "./DetailedTodoBackdrop";
import Snackbar from "../../../Components/Todos/Snackbar";

const Todo = (todoInfo: TodoType) => {
  const {
    removeTodoItem,
    permanentlyRemoveTodoItem,
    restoreTodoItem,
    markAsCompleted,
    archiveTodoItem,
  } = useTodoContext();
  const [openEditTodoBackdrop, setOpenEditTodoBackdrop] = useState(false);
  const [openDetailedTodoBackdrop, setOpenDetailedTodoBackdrop] =
    useState(false);
  const [todoIsDone, setTodoIsDone] = useState(todoInfo.completed);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(true);
  };

  const handleCloseEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(false);
  };

  const handleOpenDetailedTodoBackdrop = () => {
    return setOpenDetailedTodoBackdrop(true);
  };

  const handleCloseDetailedTodoBackdrop = () => {
    return setOpenDetailedTodoBackdrop(false);
  };

  const handleOpenSnackbar = () => {
    return setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    return setOpenSnackbar(false);
  };

  const markTodoAsCompleted = () => {
    setTodoIsDone(!todoIsDone);
    return setTimeout(() => {
      markAsCompleted({ id: todoInfo.id, completed: !todoInfo.completed });
    }, 1500);
  };

  return (
    <div className="todo">
      {/* <button className="button" onClick={handleOpenSnackbar}>
        C
      </button> */}
      <h1 className="todo-title">
        {todoInfo.title?.length === 0 ? "No title" : todoInfo.title}
      </h1>
      <p className="todo-p">{todoInfo.content}</p>
      <div className="todo-checked">
        <input
          type="checkbox"
          id={`${todoInfo.id}`}
          checked={todoIsDone}
          onChange={markTodoAsCompleted}
        />
        <label htmlFor={`${todoInfo.id}`}>Completed</label>
      </div>
      <div className="button-cont flex items-center justify-around w-full">
        {todoInfo.deleted === undefined || todoInfo.deleted === false ? (
          <>
            <button
              className="todo-action-button"
              onClick={handleOpenEditTodoBackdrop}
            >
              <FiEdit3 size={"1.3rem"} />
            </button>
            <>
              {todoInfo.archived === undefined ||
              todoInfo.archived === false ? (
                <button
                  className="todo-action-button"
                  onClick={() =>
                    archiveTodoItem({
                      id: todoInfo.id,
                      archived: todoInfo.archived as boolean,
                    })
                  }
                >
                  <BsArchive size={"1.3rem"} />
                </button>
              ) : (
                <button
                  className="todo-action-button"
                  onClick={() =>
                    archiveTodoItem({
                      id: todoInfo.id,
                      archived: todoInfo.archived as boolean,
                    })
                  }
                >
                  <RiInboxUnarchiveLine size={"1.3rem"} />
                </button>
              )}
            </>
            <button
              className="todo-action-button"
              onClick={() =>
                removeTodoItem({ id: todoInfo.id, deleted: todoInfo.deleted })
              }
            >
              <BsTrash size={"1.3rem"} />
            </button>
            <button
              className="todo-action-button"
              onClick={handleOpenDetailedTodoBackdrop}
            >
              <ImEnlarge2 size={"1.3rem"} />
            </button>
          </>
        ) : (
          <>
            <button
              className="todo-action-button"
              onClick={() => permanentlyRemoveTodoItem({ id: todoInfo.id })}
            >
              <CgRemove size={"1.5rem"} color={"rgb(220 38 38)"} />
            </button>
            <button
              className="todo-action-button"
              onClick={() =>
                restoreTodoItem({ id: todoInfo.id, deleted: todoInfo.deleted })
              }
            >
              <FaTrashRestore size={"1.5rem"} color={"rgb(22 163 74)"} />
            </button>
          </>
        )}
      </div>
      {openEditTodoBackdrop && (
        <EditTodoBackdrop
          handleCloseEditTodoBackdrop={handleCloseEditTodoBackdrop}
          todoInfo={
            {
              id: todoInfo.id,
              title: todoInfo.title,
              content: todoInfo.content,
            } as EditTodoParamsType
          }
        />
      )}
      {openDetailedTodoBackdrop && (
        <DetailedTodoBackdrop
          handleCloseDetailedTodoBackdrop={handleCloseDetailedTodoBackdrop}
          detailedTodoInfo={
            {
              id: todoInfo.id,
              title: todoInfo.title,
              content: todoInfo.content,
              archived: todoInfo.archived,
              completed: todoInfo.completed,
              deleted: todoInfo.deleted,
            } as DetailedTodoType
          }
        />
      )}
      {/* <Snackbar
        text="Success message"
        handleCloseSnackbar={handleCloseSnackbar}
      /> */}
    </div>
  );
};

export default Todo;
