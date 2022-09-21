import React, { useState, SyntheticEvent } from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
};

const TodoForm = ({ handleOpen, handleClose }: Props) => {
  const { addTodoItem } = useTodoContext();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoContent, setTodoContent] = useState<string>("");
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(todoTitle);
    console.log(todoContent);

    todoContent !== "" &&
      addTodoItem({ title: todoTitle, content: todoContent });

    setTodoContent("");
    setTodoTitle("");
  };

  return (
    <form
      action=""
      className="make-todo w-full flex flex-col  p-3 bg-stone-700 rounded-xl gap-5 border-2 border-slate-900"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="todo-form-input font-semibold text-2xl placeholder:text-stone-300"
        value={todoTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoTitle(e.target.value)
        }
        placeholder="Add a title..."
      />
      <textarea
        className="todo-form-input resize-none placeholder:text-stone-300"
        rows={7}
        maxLength={2000}
        value={todoContent}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTodoContent(e.target.value);
        }}
        placeholder="Write a task..."
      />
      <div className="form-buttons flex items-center justify-around">
        <button className="button" onClick={handleClose}>
          Close the form
        </button>
        <button type="submit" className="button w-max self-center">
          Finish
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
