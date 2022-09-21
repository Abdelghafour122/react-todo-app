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
};

const Todo = ({ todoContent, todoTitle, todoId }: Props) => {
  const { removeTodoItem, todoList } = useTodoContext();
  const [openEditTodoBackdrop, setOpenEditTodoBackdrop] = useState(false);

  const handleOpenEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(true);
  };

  const handleCloseEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(false);
  };

  console.log(todoList);
  return (
    <div className="todo bg-slate-800 text-stone-300 rounded-md flex flex-col items-start justify-between p-3 basis-1/5">
      <h1 className="text-xl font-semibold text-stone-200">
        {todoTitle?.length === 0 ? "No title" : todoTitle}
      </h1>
      <p className="">{todoContent}</p>
      {/* <input type="checkbox" checked={todo.completed}>
        Completed
      </input> */}
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
