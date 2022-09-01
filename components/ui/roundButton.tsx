import React, { FunctionComponent } from "react";
import { IRoundButton } from "../../interfaces/interfaces";

const RoundButton: FunctionComponent<IRoundButton> = ({
  icon,
  left = "",
  right = "",
  top = "",
  bottom = "",
  handleOnClick = () => {},
}) => {
  return (
    <button
      className={`absolute rounded-full h-10 w-10 ${left} ${right} ${top} ${bottom}
        flex items-center justify-center 
        bg-gray-50 bg-opacity-75 border border-gray-200 
      `}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  );
};

export default RoundButton;