import React, { useState, SyntheticEvent } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useTodoContext } from "../../../Contexts/TodoContext";

type Props = {
  handleCloseTodoFormBackdrop: () => void;
};

const TodoForm = ({ handleCloseTodoFormBackdrop }: Props) => {
  const { addTodoItem } = useTodoContext();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoContent, setTodoContent] = useState<string>("");
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    todoContent !== "" &&
      addTodoItem({ title: todoTitle, content: todoContent });

    setTodoContent("");
    setTodoTitle("");

    handleCloseTodoFormBackdrop();
  };

  return (
    <div className="add-todo absolute top-0 left-0 h-full w-full flex items-center justify-center bg-zinc-700 bg-opacity-90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center basis-2/4">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-200 ">Add a todo</p>
          <button
            className="p-2 rounded-full hover:bg-stone-500 active:bg-stone-400"
            onClick={handleCloseTodoFormBackdrop}
          >
            <VscChromeClose color="rgb(231 229 228)" size="1.5rem" />
          </button>
        </div>
        <form
          action=""
          className="make-todo w-full flex flex-col  p-3 bg-stone-700 rounded-xl gap-5 border-2 border-slate-900"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="todo-form-input font-semibold text-2xl"
            value={todoTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTodoTitle(e.target.value)
            }
            placeholder="Add a title..."
          />
          <textarea
            className="todo-form-input resize-none"
            rows={7}
            maxLength={2000}
            value={todoContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setTodoContent(e.target.value);
            }}
            placeholder="Write a task..."
          />
          <div className="form-buttons flex items-center justify-around">
            <button
              type="submit"
              className="button w-full self-center"
              disabled={todoContent === ""}
            >
              Make todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
