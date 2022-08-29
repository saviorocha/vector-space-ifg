import React from "react";

const BottomNav = () => {
  return (
    <div
      className="
        fixed bottom-0 w-full h-36 
        flex items-center justify-center 
        bg-gray-100 rounded-tr-3xl rounded-tl-3xl shadow-md
        border border-gray-400
      "
    >
      
      <div
        className="
          w-2/5 h-4/5 rounded-md
          bg-white shadow-md
          border border-gray-400
        "
      ></div>
    </div>
  );
};

export default BottomNav;
