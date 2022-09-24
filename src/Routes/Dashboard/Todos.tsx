import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

import { HiLightBulb } from "react-icons/hi";
import TodoForm from "./Todos/TodoForm";
import TodosContainer from "./Containers/TodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import Message from "./Todos/Message";

type Props = {};

const Todos = (props: Props) => {
  const { todoList } = useTodoContext();

  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noOngoingTodos, setNoOngoingTodos] = useState<boolean>();

  const handleCloseTodoFormBackdrop = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoFormBackdrop = () => {
    return setOpenTodoForm(true);
  };

  useEffect(() => {
    const checkForOngoingTodos = () => {
      return todoList.every(
        (todo) =>
          todo.archived === true ||
          todo.completed === true ||
          todo.deleted === true
      );
    };
    setNoOngoingTodos(() => checkForOngoingTodos());
    console.log(checkForOngoingTodos());
  }, [todoList]);

  useEffect(() => {
    noOngoingTodos === undefined ? setLoading(true) : setLoading(false);
  }, [noOngoingTodos]);

  return (
    <div className="todos">
      <div className="container">
        {openTodoForm ? (
          <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
        ) : (
          <div className="form-note flex items-center justify-center gap-2">
            <Message message={"Click to add a todo"} />
            <button className="button" onClick={handleOpenTodoFormBackdrop}>
              Open
            </button>
          </div>
        )}
        <div className="w-full flex flex-wrap gap-2 justify-center mt-8">
          {loading === true ? (
            <p>Loading...</p>
          ) : noOngoingTodos === true ? (
            <EmptySection
              Icon={HiLightBulb}
              message={"Your ongoing todos will show up here!"}
            />
          ) : (
            <TodosContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
