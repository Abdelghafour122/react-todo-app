import React, { useRef, useEffect, useState } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
import FinishedTodosContainer from "./Todos/FinishedTodosContainer";
import Message from "./Todos/Message";

type Props = {};

const Finished = (props: Props) => {
  const { todoList } = useTodoContext();
  const [noFinishedTodos, setNoFinishedTodos] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    noFinishedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [noFinishedTodos]);

  useEffect(() => {
    const checkForUnfinishedTodos = () => {
      return todoList.every(
        (todo) => todo.completed === false || todo.deleted === true
      );
    };
    setNoFinishedTodos(() => checkForUnfinishedTodos());
  }, [todoList]);

  return (
    <div className="finished-todos mt-3">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : noFinishedTodos === true || todoList.length === 0 ? (
          <Message message={"Your finished todos will be moved in here!"} />
        ) : (
          <FinishedTodosContainer />
        )}
        {/* {noFinishedTodos === true || todoList.length === 0 ? (
          <Message message={"Your finished todos will be moved in here!"} />
        ) : (
          <FinishedTodosContainer />
        )} */}
      </div>
    </div>
  );
};

export default Finished;
