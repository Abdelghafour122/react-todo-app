import React, { useState } from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { EditTodoPayloadType } from "../../../Utils/types";

type Props = {
  todoContent: string;
  todoTitle?: string;
  todoId?: number;
  todoDone: boolean;
};

const Todo = ({ todoContent, todoTitle, todoId, todoDone }: Props) => {
  const { removeTodoItem, markAsCompleted, todoList } = useTodoContext();
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
        <button
          className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500"
          onClick={handleOpenEditTodoBackdrop}
        >
          <FiEdit3 />
        </button>
        <button className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500">
          <BsArchive />
        </button>
        <button
          className="p-2 rounded-full hover:bg-slate-700 active:bg-slate-500"
          onClick={() => removeTodoItem({ id: todoId })}
        >
          <BsTrash />
        </button>
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
