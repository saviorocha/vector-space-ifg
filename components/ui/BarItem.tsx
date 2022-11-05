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
          dark:bg-neutral-800 dark:border-neutral-900
          overflow-hidden whitespace-nowrap rounded-lg
          hover:text-gray-900 hover:bg-gray-200 
          dark:hover:text-gray-50 dark:hover:bg-neutral-700 
          transition duration-300 ease-in-out cursor-pointer
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
                  className="
                    text-xs py-4 pl-12 pr-6 h-6 cursor-pointer
                    flex items-center whitespace-nowrap overflow-hidden rounded 
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
