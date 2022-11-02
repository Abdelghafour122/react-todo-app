import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
// import { Labels } from "../../../Utils/types";
import LabelItem from "./LabelItem";
import NoLabelsMessage from "./NoLabelsMessage";

// type Props = {
//   labelsAsState: Labels;
// };

// const LabelContentHolder = ({ labelsAsState }: Props) => {
const LabelContentHolder = () => {
  const { labelsArray } = useTodoContext();

  return (
    <>
      {labelsArray.length !== 0 ? (
        <ul className="w-full flex flex-col gap-1 items-center justify-start p-2 bg-stone-900 rounded-md h-[290px] overflow-y-scroll">
          {labelsArray.map((label) => {
            return (
              <LabelItem
                key={label.id}
                id={label.id}
                name={label.name}
                count={label.count}
                // label={label}
              />
            );
          })}
        </ul>
      ) : (
        <NoLabelsMessage />
      )}
    </>
  );
};

export default LabelContentHolder;
