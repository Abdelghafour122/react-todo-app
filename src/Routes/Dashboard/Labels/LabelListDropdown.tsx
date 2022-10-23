import React from "react";
import { Labels } from "../../../Utils/types";

type Props = {
  labelsList: Labels;
};

const LabelListDropdown = ({ labelsList }: Props) => {
  return (
    <div className="label-list-drop absolute bg-zinc-900 top-[110%] p-1 w-max min-h-[6rem] max-h-[8rem] rounded-sm flex flex-col items-start justify-start gap-2 overflow-y-scroll cursor-default">
      <p className="text-stone-400 text-lg font-bold">Labels:</p>
      {labelsList.length === 0 ? (
        <p className="p-1 font-semibold rounded-sm w-full text-left text-stone-300">
          No labels to add, try creating some.
        </p>
      ) : (
        <ul className="small-labels flex flex-col items-start justify-start min-w-[10rem]">
          {labelsList.map((label) => (
            <li
              key={label.id}
              className="p-1 font-semibold rounded-sm w-full text-left text-stone-300 hover:bg-zinc-700 active:bg-zinc-800"
            >
              {label.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LabelListDropdown;
