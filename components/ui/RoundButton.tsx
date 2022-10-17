import React, { FunctionComponent } from "react";
import { IRoundButton } from "../../interfaces/interfaces";

const RoundButton: FunctionComponent<IRoundButton> = ({
  icon,
  disabled = false,
  classString = "",
  idString = "",
  handleOnClick = () => {},
}) => {
  return (
    <button
      id={idString}
      className={classString}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  );
};

export default RoundButton;
