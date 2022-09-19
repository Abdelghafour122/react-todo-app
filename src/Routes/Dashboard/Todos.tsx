import React, { SyntheticEvent } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
type Props = {};

const Todos = (props: Props) => {
  const {
    addTodoItem,
    todoList,
    removeTodoItem,
    markAsCompleted,
    editTodoItem,
  } = useTodoContext();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // addTodoItem({ content: "mjazodjoajd" });

    editTodoItem({ id: 1222, content: "edited todo text" });
    // markAsCompleted({ id: 1222 });
  };
  console.log(todoList);
  return (
    <div className="todos mt-3">
      <div className="container">
        <form
          action=""
          className="make-todo w-full flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="Add a title..." />
          <input type="text" placeholder="Write a task..." />
          <button type="submit">Finish</button>
        </form>
      </div>
    </div>
  );
};

export default Todos;
