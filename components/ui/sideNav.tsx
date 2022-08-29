import React from "react";
import { Box, ChevronDown } from "react-feather";

const SideNav = () => {
  return (
    <div
      className="w-60 h-full shadow-md bg-gray-100 border-r border-gray-300 px-1 top-0 fixed"
      // dark:bg-darklight dark:border-black
    >
      <ul className="relative">
        <li className="relative m-1 py-1">
          <a
            className="
              flex items-center text-sm py-4 px-6 h-12 
              bg-gray-50 border border-gray-400 shadow-md 
              overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded-lg
              hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
            "
          >
            <Box />
            <span>Inserir Vetor</span>
            <ChevronDown />
          </a>
          <ul className="relative accordion-collapse collapse">
            <li className="relative">
              <a
                href="#!"
                className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Link 3
              </a>
            </li>
            <li className="relative">
              <a
                href="#!"
                className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Link 4
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
