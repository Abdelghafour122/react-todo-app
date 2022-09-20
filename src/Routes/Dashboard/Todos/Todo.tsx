import React from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { useTodoContext } from "../../../Contexts/TodoContext";

type Props = {
  todoContent: string;
  todoTitle?: string;
  todoId?: number;
};

const Todo = ({ todoContent, todoTitle, todoId }: Props) => {
  const { removeTodoItem, editTodoItem, todoList } = useTodoContext();
  console.log(todoList);
  return (
    <div className="todo bg-slate-800 text-stone-300 rounded-md flex flex-col items-start justify-between p-3">
      <div className="flex items-center justify-between w-full">
        <button>
          <FiEdit3 />
        </button>
        <button>
          <BsArchive />
        </button>
        <button onClick={() => removeTodoItem({ id: todoId })}>
          <BsTrash />
        </button>
      </div>
      <h1 className="text-xl font-semibold text-stone-200">
        {todoTitle?.length === 0 ? "No title" : todoTitle}
      </h1>
      <p className="">{todoContent}</p>
      {/* <input type="checkbox" checked={todo.completed}>
        Completed
      </input> */}
    </div>
  );
};

export default Todo;
