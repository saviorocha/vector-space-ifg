import React from "react";
import { ZoomIn, ZoomOut } from "react-feather";

const BottomNav = () => {
  return (
    <div
      className="
        fixed bottom-0 w-full h-36 absolute
        flex items-center justify-center 
        bg-gray-100 rounded-tr-3xl rounded-tl-3xl shadow-md
        border border-gray-400
      "
    >
      <button
        className="
          absolute rounded-full h-12 w-12 
          flex items-center justify-center 
          border border-gray-400 bg-gray-50
        "
      >
        <ZoomIn className="text-gray-700"/>
      </button>
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
