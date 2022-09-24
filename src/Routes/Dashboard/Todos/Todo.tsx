import React, { useState } from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";
import { FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { EditTodoPayloadType } from "../../../Utils/types";

type Props = {
  todoContent: string;
  todoTitle?: string;
  todoId?: number;
  todoDone: boolean;
  todoDeleted?: boolean;
  todoArchived?: boolean;
};

const Todo = ({
  todoContent,
  todoTitle,
  todoId,
  todoDone,
  todoDeleted,
  todoArchived,
}: Props) => {
  const {
    removeTodoItem,
    permanentlyRemoveTodoItem,
    restoreTodoItem,
    markAsCompleted,
    archiveTodoItem,
    todoList,
  } = useTodoContext();
  const [openEditTodoBackdrop, setOpenEditTodoBackdrop] = useState(false);
  const [todoIsDone, setTodoIsDone] = useState(todoDone);

  const handleOpenEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(true);
  };

  const handleCloseEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(false);
  };

  const markTodoAsCompleted = () => {
    setTodoIsDone(!todoIsDone);
    return setTimeout(() => {
      markAsCompleted({ id: todoId });
    }, 1500);
  };
  console.log(todoList);
  return (
    <div className="todo">
      <h1 className="text-xl font-bold text-stone-100 mb-3">
        {todoTitle?.length === 0 ? "No title" : todoTitle}
      </h1>
      <p className="text-lg ">{todoContent}</p>
      <div className="todo-checked">
        <input
          type="checkbox"
          id={`${todoId}`}
          checked={todoIsDone}
          onChange={markTodoAsCompleted}
        />
        <label htmlFor={`${todoId}`}>Completed</label>
      </div>
      <div className="flex items-center justify-around w-full mt-3">
        {todoDeleted === undefined || todoDeleted === false ? (
          <>
            <button
              className="todo-action-button"
              onClick={handleOpenEditTodoBackdrop}
            >
              <FiEdit3 size={"1.3rem"} />
            </button>
            <>
              {todoArchived === undefined || todoArchived === false ? (
                <button
                  className="todo-action-button"
                  onClick={() =>
                    archiveTodoItem({ id: todoId, deleted: todoDeleted })
                  }
                >
                  <BsArchive size={"1.3rem"} />
                </button>
              ) : (
                <button
                  className="todo-action-button"
                  onClick={() =>
                    archiveTodoItem({ id: todoId, deleted: todoDeleted })
                  }
                >
                  <RiInboxUnarchiveLine size={"1.3rem"} />
                </button>
              )}
            </>
            <button
              className="todo-action-button"
              onClick={() => removeTodoItem({ id: todoId })}
            >
              <BsTrash size={"1.3rem"} />
            </button>
          </>
        ) : (
          <>
            <button
              className="todo-action-button"
              onClick={() => permanentlyRemoveTodoItem({ id: todoId })}
            >
              <CgRemove size={"1.5rem"} color={"rgb(220 38 38)"} />
            </button>
            <button
              className="todo-action-button"
              onClick={() => restoreTodoItem({ id: todoId })}
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
              id: todoId,
              title: todoTitle,
              content: todoContent,
            } as EditTodoPayloadType
          }
        />
      )}
    </div>
  );
};

export default Todo;
