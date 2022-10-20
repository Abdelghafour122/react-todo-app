import React from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

type Props = {
  labelText: string;
};

const LabelItem = ({ labelText }: Props) => {
  return (
    <li className="label-item">
      <p className="label-text">{labelText}</p>
      <div className="label-buttons flex gap-2 items-center">
        <button className="label-button">
          <FiEdit3 size={"1.2rem"} color={"rgb(214 211 209)"} />
        </button>
        <button className="label-button">
          <BsTrash size={"1.2rem"} color={"rgb(214 211 209)"} />
        </button>
      </div>
    </li>
  );
};

export default LabelItem;
