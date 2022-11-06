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
