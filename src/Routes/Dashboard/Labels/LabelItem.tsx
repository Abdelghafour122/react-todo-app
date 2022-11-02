import React, { useState, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { Label } from "../../../Utils/types";

const LabelItem = ({ id, name, count }: Label) => {
  // const LabelItem = ({label}: Label) => {
  const { deleteLabel, editLabel } = useTodoContext();
  const [editable, setEditable] = useState(false);
  const labelNameRef = useRef<HTMLInputElement | null>(null);

  const handleEditLabelName = () => {
    console.log(labelNameRef.current?.value);
    labelNameRef.current?.value !== undefined &&
    labelNameRef.current?.value !== ""
      ? editLabel({
          // id: label.id,
          id: id,
          name: labelNameRef.current?.value,
          case: "name",
        })
      : // REPLACE WITH A PROPER ERROR MESSAGE
        console.log("cannot update label");
  };

  return (
    <li className="label-item">
      {editable ? (
        <input
          className="form-input"
          type="text"
          // placeholder={label.name}
          placeholder={name}
          ref={labelNameRef}
        />
      ) : (
        // <p className="label-text">{label.name}</p>
        <p className="label-text">{name}</p>
      )}
      <div className="label-buttons flex gap-2 items-center">
        {count === 0 ? (
          // {label.count === 0 ? (
          <p className="font-semibold text-base text-yellow-600 p-1 bg-yellow-200 rounded-lg w-max">
            Unused
          </p>
        ) : (
          // <p className="font-semibold text-base text-stone-300 p-1 bg-stone-600 rounded-lg w-max">{`Count: ${label.count}`}</p>
          <p className="font-semibold text-base text-stone-300 p-1 bg-stone-600 rounded-lg w-max">{`Count: ${count}`}</p>
        )}
        {editable ? (
          <button
            className="label-button"
            onClick={() => {
              setEditable(false);
              handleEditLabelName();
            }}
          >
            <MdOutlineDoneOutline size={"1.2rem"} color={"rgb(214 211 209)"} />
          </button>
        ) : (
          <button className="label-button" onClick={() => setEditable(true)}>
            <FiEdit3 size={"1.2rem"} color={"rgb(214 211 209)"} />
          </button>
        )}
        <button
          className="label-button"
          onClick={() =>
            // deleteLabel({ labelId: label.id, labelCount: label.count })
            deleteLabel({ labelId: id, labelCount: count })
          }
        >
          <BsTrash size={"1.2rem"} color={"rgb(214 211 209)"} />
        </button>
      </div>
    </li>
  );
};

export default LabelItem;
