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
      className="make-todo w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={todoTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoTitle(e.target.value)
        }
        placeholder="Add a title..."
      />
      <input
        type="text"
        value={todoContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoContent(e.target.value)
        }
        placeholder="Write a task..."
      />
      <button type="submit">Finish</button>
    </form>
  );
};

export default TodoForm;
