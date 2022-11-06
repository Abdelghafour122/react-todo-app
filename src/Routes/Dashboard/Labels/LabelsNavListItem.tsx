import React from "react";
import { HiTag } from "react-icons/hi";
import LabelTooltip from "./LabelTooltip";

type Props = {
  count: number;
  name: string;
};

const LabelsNavListItem = ({ count, name }: Props) => {
  console.log(`label ${name}, count ${count}`);
  return (
    <li className="relative group">
      <button
        className="p-2 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
        // className="flex items-center p-2 bg-stone-700 transition-all rounded-xl duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
        // onClick={handleOpenLabelsBackdrop}
      >
        <HiTag size={"1.3rem"} color="rgb(253 186 116)" />
        {/* <p className="font-semibold text-stone-300">{name} </p> */}
        {count > 0 ? (
          <div className="inline-flex absolute -top-1.5 -right-1.5 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full ">
            {count}
          </div>
        ) : null}
      </button>
      <LabelTooltip tooltipContent={name} />
    </li>
  );
};

export default LabelsNavListItem;