import React from "react";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const FinishedTodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Finished Todos"} />
      <div className="finished-todos-container flex flex-wrap items-start justify-start gap-2">
        {todoList.map(
          (todo) =>
            todo.completed === true &&
            todo.deleted === false &&
            todo.archived === false && <Todo key={todo.id} {...todo} />
        )}
      </div>
    </div>
  );
};

export default FinishedTodosContainer;
