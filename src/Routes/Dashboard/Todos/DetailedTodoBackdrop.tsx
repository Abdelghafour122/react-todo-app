import React from "react";
import { EditTodoParamsType } from "../../../Utils/types";

type Props = {
  handleCloseDetailedTodoBackdrop: () => void;
  detailedTodoInfo: EditTodoParamsType;
};

const DetailedTodoBackdrop = ({
  handleCloseDetailedTodoBackdrop,
  detailedTodoInfo,
}: Props) => {
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
          <div className="todo-funcs w-full flex items-center justify-between">
            {/* <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul> */}
            <div className="funcs">funcs here</div>
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
