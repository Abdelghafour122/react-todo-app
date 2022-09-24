import React, { useState, useEffect } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
import ArchivedTodosContainer from "./Containers/ArchivedTodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import { BsArchiveFill } from "react-icons/bs";

type Props = {};

const Archived = (props: Props) => {
  const { todoList } = useTodoContext();
  const [loading, setLoading] = useState(true);
  const [unArchivedTodos, setUnArchivedTodos] = useState<boolean>();

  useEffect(() => {
    const checkForUnArchivedTodos = () => {
      return todoList.every(
        (todo) =>
          todo.archived === false ||
          (todo.archived === true && todo.deleted === true)
      );
    };
    setUnArchivedTodos(() => checkForUnArchivedTodos());
  }, [todoList]);

  useEffect(() => {
    unArchivedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [unArchivedTodos]);

  return (
    <div className="archived-todos mt-3">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : unArchivedTodos === true ? (
          <EmptySection
            Icon={BsArchiveFill}
            message={"The archived todos will appear here!"}
          />
        ) : (
          <ArchivedTodosContainer />
        )}
      </div>
    </div>
  );
};

export default Archived;
