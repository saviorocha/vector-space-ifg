import { FunctionComponent } from "react";
import { IInfoBox } from "../../../interfaces/interfaces";

const InfoBox: FunctionComponent<IInfoBox> = ({ children, customStyles }) => {
  return (
    <section
      className={`
        rounded-md overflow-auto
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md relative
        dark:bg-zinc-900 dark:border-neutral-600
        ${customStyles}
      `}
    >
      {children}
    </section>
  );
};

export default InfoBox;
