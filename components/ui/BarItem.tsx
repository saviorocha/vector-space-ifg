import React, { FunctionComponent } from "react";
import { IBarItemProps } from "../../interfaces/interfaces";

const BarItem: FunctionComponent<IBarItemProps> = ({
  title,
  leftIcon,
  subItems = [],
  rightIcon = null,
  handleOnClick = undefined,
}) => {
  return (
    <li className="relative m-1 py-1">
      <a
        className="
          flex items-center text-sm py-4 px-6 h-12 
          bg-gray-50 border border-gray-400 shadow-md 
          overflow-hidden whitespace-nowrap rounded-lg
          hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
        "
        onClick={handleOnClick}
      >
        {leftIcon}
        <span>{title}</span>
        {rightIcon}
      </a>
      {subItems && (
        <ul className="relative accordion-collapse collapse">
          <li className="relative">
            {subItems.map(({ title, handleItemOnClick }, i) => {
              return (
                <a
                  key={i}
                  href="#!"
                  className="
                    text-xs py-4 pl-12 pr-6 h-6 
                    flex items-center whitespace-nowrap overflow-hidden rounded 
                    hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out
                  "
                  onClick={handleItemOnClick}
                >
                  {title}
                </a>
              );
            })}
          </li>
        </ul>
      )}
    </li>
  );
};

export default BarItem;