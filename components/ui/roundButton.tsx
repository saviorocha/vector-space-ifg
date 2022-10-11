import React, { FunctionComponent } from "react";
import { IRoundButton } from "../../interfaces/interfaces";

const RoundButton: FunctionComponent<IRoundButton> = ({
  icon,
  disabled = false,
  classString,
  handleOnClick = () => {},
}) => {
  return (
    <button
      className={classString}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  );
};

export default RoundButton;
