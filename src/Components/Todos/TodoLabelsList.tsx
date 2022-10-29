import React, { useEffect, useRef } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
import { Labels } from "../../Utils/types";
import LabelChip from "./LabelChip";

type Props = {
  labelsList: Labels;
  todoId: string;
};

const TodoLabelsList = ({ labelsList, todoId }: Props) => {
  // const { labelsArray } = useTodoContext();
  // const labelsListRef = useRef(labelsList);
  // useEffect(() => {
  //   //  labelsList !== undefined
  //   labelsListRef.current = labelsList.filter((localLabel) =>
  //     labelsArray.some((globalLabel) => globalLabel.id === localLabel.id)
  //   );
  // }, [labelsArray, labelsList]);

  return (
    <>
      {labelsList !== undefined ? (
        <ul className="labels-list flex gap-1 items-center justify-start flex-wrap w-full">
          {labelsList.map((label) => (
            <LabelChip key={label.id} label={label} todoId={todoId} />
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default TodoLabelsList;
