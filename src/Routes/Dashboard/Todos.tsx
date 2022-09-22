import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

import Message from "./Todos/Message";
import TodoForm from "./Todos/TodoForm";
import TodosContainer from "./Todos/TodosContainer";

type Props = {};

const Todos = (props: Props) => {
  const { todoList } = useTodoContext();

  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noOngoingTodos, setNoOngoingTodos] = useState<boolean>();

  const handleCloseTodoForm = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoForm = () => {
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
    <div className="todos mt-3">
      <div className="container">
        {openTodoForm ? (
          <TodoForm
            handleOpen={handleOpenTodoForm}
            handleClose={handleCloseTodoForm}
          />
        ) : (
          <div className="form-note flex items-center justify-center gap-2">
            <Message message={"Click to add a todo"} />
            <button className="button" onClick={handleOpenTodoForm}>
              Open
            </button>
          </div>
        )}
        <div className="w-full flex flex-wrap gap-2 justify-center mt-8">
          {loading === true ? (
            <p>Loading...</p>
          ) : noOngoingTodos === true ? (
            <Message message={"Your undone todos will show up here!"} />
          ) : (
            <TodosContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
