import React from "react";

const RoundButton = ({ Icon, left="", right="", top="", bottom="" }) => {
  return (
    <button
      className={`absolute rounded-full h-10 w-10 ${left} ${right} ${top} ${bottom}
        flex items-center justify-center 
        bg-gray-50 bg-opacity-75 border border-gray-200 
      `}
    >
      <Icon />
    </button>
  );
};

export default RoundButton;
