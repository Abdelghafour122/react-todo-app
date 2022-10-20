import React from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { Label } from "../../../Utils/types";

const LabelItem = ({ id, name, count }: Label) => {
  const { deleteLabel } = useTodoContext();
  return (
    <li className="label-item">
      <p className="label-text">{name}</p>
      <div className="label-buttons flex gap-2 items-center">
        {count === 0 ? (
          <p className="font-semibold text-base text-yellow-600 p-1 bg-yellow-200 rounded-lg">
            Unused
          </p>
        ) : (
          <p className="font-semibold text-base text-stone-300 p-1 bg-stone-600 rounded-lg">{`Count: ${count}`}</p>
        )}
        <button className="label-button">
          <FiEdit3 size={"1.2rem"} color={"rgb(214 211 209)"} />
        </button>
        <button className="label-button" onClick={() => deleteLabel(id)}>
          <BsTrash size={"1.2rem"} color={"rgb(214 211 209)"} />
        </button>
      </div>
    </li>
  );
};

export default LabelItem;
