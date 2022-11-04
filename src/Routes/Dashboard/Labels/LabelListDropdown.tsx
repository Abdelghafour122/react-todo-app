import React from "react";
import { Labels } from "../../../Utils/types";
import LabelDropdownItem from "./LabelDropdownItem";

type Props = {
  currTodoId: string;
  labelsList: Labels;
  currTodoLabelsList: Labels;
};

const LabelListDropdown = ({
  currTodoLabelsList,
  labelsList,
  currTodoId,
}: Props) => {
  return (
    <div className="label-list-drop absolute bg-zinc-900 left-[110%] top-0 p-1 w-max min-h-[6rem] max-h-[8rem] rounded-sm flex flex-col items-start justify-start gap-2 overflow-y-scroll cursor-default">
      <p className="text-stone-400 text-lg font-bold">Labels:</p>
      {labelsList.length === 0 ? (
        // EXTRACT AS A SEPARATE COMPONENT
        <p className="p-1 font-semibold rounded-sm w-full text-left text-stone-300">
          No labels to add, try creating some.
        </p>
      ) : (
        <ul className="small-labels flex flex-col items-start justify-start min-w-[10rem] gap-1">
          {labelsList.map((label) =>
            currTodoLabelsList.every(
              (todoLabel) => todoLabel.id !== label.id
            ) ? (
              <LabelDropdownItem
                key={label.id}
                label={label}
                currTodoId={currTodoId}
                added={false}
              />
            ) : (
              <LabelDropdownItem
                key={label.id}
                label={label}
                currTodoId={currTodoId}
                added={true}
              />
            )
          )}
          {}
        </ul>
      )}
    </div>
  );
};

export default LabelListDropdown;
