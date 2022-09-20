import React, { useState, SyntheticEvent } from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";

type Props = {};

const TodoForm = (props: Props) => {
  const { addTodoItem } = useTodoContext();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoContent, setTodoContent] = useState<string>("");
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // console.log(todoContentRef.current?.value);
    // console.log(todoTitleRef.current?.value);

    // todoContentRef.current?.value.length !== 0 &&
    //   addTodoItem({ content: todoContentRef.current?.value });

    // console.log(todoContentRef.current?.value);

    console.log(todoTitle);
    console.log(todoContent);

    todoContent !== "" &&
      addTodoItem({ title: todoTitle, content: todoContent });

    setTodoContent("");
    setTodoTitle("");

    // console.log(todoList);
  };
  return (
    <form
      action=""
      className="make-todo w-full flex flex-col mb-8 p-3 bg-stone-700 rounded-xl gap-5 border-2 border-slate-900"
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
      <button type="submit" className="button w-max self-center">
        Finish
      </button>
    </form>
  );
};

export default TodoForm;
