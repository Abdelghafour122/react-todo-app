import React from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { DetailedTodoType } from "../../../Utils/types";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { RiInboxUnarchiveLine } from "react-icons/ri";

type Props = {
  handleCloseDetailedTodoBackdrop: () => void;
  detailedTodoInfo: DetailedTodoType;
};

const DetailedTodoBackdrop = ({
  handleCloseDetailedTodoBackdrop,
  detailedTodoInfo,
}: Props) => {
  const { removeTodoItem, archiveTodoItem, formatDate } = useTodoContext();
  return (
    <div className="detailed-todo absolute top-0 left-0 h-full w-full flex items-center justify-center bg-zinc-700 bg-opacity-90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center basis-3/5 shadow-2xl">
        <section className="details flex flex-col items-start justify-start gap-3 w-full bg-zinc-800 p-3 rounded-md">
          <div className="todo-info flex flex-col items-start justify-start w-full gap-3">
            <h1 className="todo-title text-stone-300 font-medium text-2xl rounded-md mb-0 w-[560px]">
              {detailedTodoInfo.title}
            </h1>
            <p className="w-full min-h-[150px]">{detailedTodoInfo.content}</p>
          </div>
          <p>
            {" "}
            {`${
              detailedTodoInfo.edited === false ? "Created on: " : "Edited on: "
            } ${formatDate(detailedTodoInfo.date)}`}{" "}
          </p>
          <div className="todo-funcs w-full flex items-center justify-between">
            <ul className="flex items-center justify-between gap-1">
              <li>
                <button
                  className="todo-action-button"
                  onClick={() =>
                    removeTodoItem({
                      id: detailedTodoInfo.id,
                      deleted: detailedTodoInfo.deleted,
                    })
                  }
                >
                  <BsTrash size={"1.3rem"} />
                </button>
              </li>
              <li>
                {detailedTodoInfo.archived === undefined ||
                detailedTodoInfo.archived === false ? (
                  <button
                    className="todo-action-button"
                    onClick={() =>
                      archiveTodoItem({
                        id: detailedTodoInfo.id,
                        archived: detailedTodoInfo.archived as boolean,
                      })
                    }
                  >
                    <BsArchive size={"1.3rem"} />
                  </button>
                ) : (
                  <button
                    className="todo-action-button"
                    onClick={() =>
                      archiveTodoItem({
                        id: detailedTodoInfo.id,
                        archived: detailedTodoInfo.archived as boolean,
                      })
                    }
                  >
                    <RiInboxUnarchiveLine size={"1.3rem"} />
                  </button>
                )}
              </li>
            </ul>
            <div className="close-button">
              <button
                className="button pointer-events-auto"
                onClick={handleCloseDetailedTodoBackdrop}
              >
                Close
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DetailedTodoBackdrop;
