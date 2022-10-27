import React from "react";
import { VscChromeClose } from "react-icons/vsc";

type Props = {
  labelsName: string;
};

const LabelChip = ({ labelsName }: Props) => {
  return (
    <li className="px-2 py-1 bg-neutral-700 text-stone-300 font-semibold rounded-xl flex items-center justify-between gap-1">
      <p className="text-stone-300 font-semibold">{labelsName}</p>
      <button className="p-1 rounded-full hover:bg-neutral-600 active:bg-neutral-500">
        <VscChromeClose color="rgb(231 229 228)" size="1rem" />
      </button>
    </li>
  );
};

export default LabelChip;
