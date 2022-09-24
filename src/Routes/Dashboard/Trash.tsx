import React, { useState, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useTodoContext } from "../../Contexts/TodoContext";
import EmptySection from "./Placeholders/EmptySection";
import DeletedTodosContainer from "./Todos/Containers/DeletedTodosContainer";

type Props = {};

const Trash = (props: Props) => {
  const { todoList } = useTodoContext();
  const [undeletedTodos, setUndeletedTodos] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    undeletedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [undeletedTodos]);

  useEffect(() => {
    const checkForUndeletedTodos = () => {
      return todoList.every((todo) => todo.deleted === false);
    };
    setUndeletedTodos(() => checkForUndeletedTodos());
  }, [todoList]);

  return (
    <div className="trashed-todos h-full">
      <div className="container h-full">
        {loading ? (
          <p>Loading...</p>
        ) : undeletedTodos === true ? (
          <EmptySection
            message={"The deleted todos will appear here!"}
            Icon={BsTrashFill}
          />
        ) : (
          <DeletedTodosContainer />
        )}
      </div>
    </div>
  );
};

export default Trash;
