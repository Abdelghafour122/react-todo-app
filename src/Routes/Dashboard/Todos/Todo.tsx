import React, { useState } from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";
import { FaTrashRestore } from "react-icons/fa";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { EditTodoPayloadType } from "../../../Utils/types";

type Props = {
  todoContent: string;
  todoTitle?: string;
  todoId?: number;
  todoDone: boolean;
  todoDeleted?: boolean;
};

const Todo = ({
  todoContent,
  todoTitle,
  todoId,
  todoDone,
  todoDeleted,
}: Props) => {
  const {
    removeTodoItem,
    permanentlyRemoveTodoItem,
    restoreTodoItem,
    markAsCompleted,
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
    <div className="todo bg-slate-800 text-stone-300 rounded-md flex flex-col items-start justify-between p-3 basis-1/5">
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
              className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500"
              onClick={handleOpenEditTodoBackdrop}
            >
              <FiEdit3 size={"1.3rem"} />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500">
              <BsArchive size={"1.3rem"} />
            </button>
            <button
              className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500"
              onClick={() => removeTodoItem({ id: todoId })}
            >
              <BsTrash size={"1.3rem"} />
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500"
              onClick={() => permanentlyRemoveTodoItem({ id: todoId })}
            >
              <CgRemove size={"1.5rem"} color={"rgb(220 38 38)"} />
            </button>
            <button
              className="p-2 text-red-600 rounded-full hover:bg-slate-700 active:bg-slate-500"
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
