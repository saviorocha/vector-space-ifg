import React, { FunctionComponent } from "react";
import { PropsChildren } from "../../interfaces/interfaces";

const InfoBox: FunctionComponent<PropsChildren> = ({ children }) => {
  return (
    <section
      className="
        rounded-md w-1/4 h-28 overflow-auto
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md relative
    "
    >
      {children}
    </section>
  );
};

export default InfoBox;
