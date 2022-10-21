import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDone } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { useTodoContext } from "../../../Contexts/TodoContext";
import LabelContentHolder from "./LabelContentHolder";

type Props = {
  handleCloseLabelsBackdrop: () => void;
};

const LabelFormBackdrop = ({ handleCloseLabelsBackdrop }: Props) => {
  const { addLabel, labelsArray, fetchLabels } = useTodoContext();
  const [label, setLabel] = useState("");
  const labelValid = useRef(true);

  const [labelsAsState, setLabelsAsState] = useState(labelsArray);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  useEffect(() => {
    setLabelsAsState(labelsArray);
  }, [labelsArray]);

  useEffect(() => {
    label.trim().length >= 20
      ? (labelValid.current = false)
      : (labelValid.current = true);
  }, [label]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    labelValid.current &&
      label.trim().length > 0 &&
      addLabel({
        name: label,
        count: 0,
      });
    setLabel("");
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-zinc-700 bg-opacity-90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center basis-2/4">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-200 ">Labels</p>
          <button
            className="p-2 rounded-full hover:bg-stone-500 active:bg-stone-400"
            onClick={handleCloseLabelsBackdrop}
          >
            <VscChromeClose color="rgb(231 229 228)" size="1.5rem" />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2 border-2 border-zinc-900 rounded-lg bg-stone-600 w-full">
          <form action="" className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Add label"
                className={`todo-form-input flex-1 font-semibold ${
                  labelValid.current === false &&
                  "text-red-600 caret-red-600 border-red-600 focus:border-red-600"
                }`}
                value={label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
              />
              <button
                className="rounded-sm hover:bg-stone-500 active:bg-stone-400 p-2 disabled:opacity-0 transition-opacity duration-300"
                onClick={handleSubmit}
                disabled={!labelValid.current || label === ""}
              >
                <MdOutlineDone size={"1.2rem"} />
              </button>
            </div>
          </form>
          {labelValid.current === false && (
            <p className="-mt-2 text-red-600 font-semibold">
              Label length should be below 20 letters!
            </p>
          )}
          <LabelContentHolder labelsAsState={labelsAsState} />
        </div>
      </div>
    </div>
  );
};

export default LabelFormBackdrop;
