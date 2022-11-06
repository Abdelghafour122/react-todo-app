import React, { useEffect } from "react";
import { HiTag } from "react-icons/hi";
import { useTodoContext } from "../../../Contexts/TodoContext";
import LabelsNavListItem from "./LabelsNavListItem";

type Props = {};

const LabelsNavList = (props: Props) => {
  const { labelsArray, fetchLabels } = useTodoContext();
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return (
    <ul className="label-nav-list flex flex-col w-full items-end justify-start gap-2">
      {labelsArray.length !== 0
        ? labelsArray.map((label) => {
            return (
              //   <li key={label.id} className="relative group self-end">
              //     <button
              //       className="p-2 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
              //       // onClick={handleOpenLabelsBackdrop}
              //     >
              //       <HiTag size={"1.3rem"} color="rgb(253 186 116)" />
              //       {label.count > 0 ? (
              //         <div className="inline-flex absolute -top-1.5 -right-1.5 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full ">
              //           {label.count}
              //         </div>
              //       ) : null}
              //     </button>
              //   </li>
              <LabelsNavListItem
                key={label.id}
                count={label.count}
                name={label.name}
              />
            );
          })
        : null}
    </ul>
  );
};

export default LabelsNavList;
