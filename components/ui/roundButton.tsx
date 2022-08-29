import React from "react";

const RoundButton = ({ children }: any) => {
  return (
    <button
      className="
              absolute rounded-full h-12 w-12 
              flex items-center justify-center 
              border border-gray-400 bg-gray-50
              bottom-0 right-0
            "
    >
      {children}
    </button>
  );
};

export default RoundButton;
