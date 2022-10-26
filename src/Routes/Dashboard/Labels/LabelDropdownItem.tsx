import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { Label } from "../../../Utils/types";

type Props = {
  label: Label;
  currTodoId: string;
};

const LabelDropdownItem = ({ label, currTodoId }: Props) => {
  const { addLabelToTodoItem } = useTodoContext();
  return (
    <li className="w-full">
      <button
        className="p-1 font-semibold rounded-sm w-full text-left text-stone-300 hover:bg-zinc-700 active:bg-zinc-800"
        onClick={() =>
          addLabelToTodoItem({
            id: label.id,
            name: label.name,
            count: label.count,
            todoId: currTodoId,
          })
        }
      >
        {label.name}
      </button>
    </li>
  );
};

export default LabelDropdownItem;
