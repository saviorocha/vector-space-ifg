import React, { FunctionComponent } from "react";
import { IInforBox, PropsChildren } from "../../interfaces/interfaces";

const InfoBox: FunctionComponent<IInforBox> = ({ children, customStyles }) => {
  return (
    <section
      className={`
        rounded-md overflow-auto
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md relative
        ${customStyles}
      `}
    >
      {children}
    </section>
  );
};

export default InfoBox;
