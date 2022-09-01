import React from "react";

const BarItem = ({ title, Icon, subItems = [] }) => {
  return (
    <li className="relative m-1 py-1">
      <a
        className="
          flex items-center text-sm py-4 px-6 h-12 
          bg-gray-50 border border-gray-400 shadow-md 
          overflow-hidden whitespace-nowrap rounded-lg
          hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
        "
      >
        <Icon />
        <span>{title}</span>
      </a>
      {subItems ? (
        <ul className="relative accordion-collapse collapse">
          <li className="relative">
            {subItems.map((title, i) => {
              return (
                <a
                  key={i}
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  {title}
                </a>
              );
            })}
          </li>
        </ul>
      ) : null}
    </li>
  );
};

export default BarItem;
