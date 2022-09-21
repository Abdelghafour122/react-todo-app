import React from "react";

type Props = {
  tooltipContent: string;
};

const Tooltip = ({ tooltipContent }: Props) => {
  return (
    <div className="absolute left-[154%] top-2/4 -translate-y-1/2 p-2 w-max rounded-md bg-zinc-900 text-stone-200 font-semibold scale-0 group-hover:scale-100 shadow-md shadow-zinc-900">
      {tooltipContent}
    </div>
  );
};

export default Tooltip;
