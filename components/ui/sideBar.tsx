import React, { useRef, useState } from "react";
import { ArrowLeft, Box, ChevronDown } from "react-feather";

const SideBar = () => {
  const sideBarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSideBar = (event: any) => {
    event.preventDefault();
    if (isOpen) {
      sideBarRef.current.style.width = "0px";
    } else {
      sideBarRef.current.style.width = "250px";
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      
      <nav
        // className={sidebarClass}
        ref={sideBarRef}
        className="
          w-60 h-full px-1 top-0 left-0 fixed shadow-md 
          bg-gray-100 border-r border-gray-300 overflow-hidden
        "
        style={{
          transition: "0.5s",
        }}
        // dark:bg-darklight dark:border-black
      >
        <ul className="relative">
          {/* <li className="relative m-1 py-1">
            <button
              className="
                rounded-full h-10 w-10 mr-4 right-0
                flex items-center justify-center 
                bg-gray-50 bg-opacity-75 border border-gray-400 
              "
              onClick={toggleSideBar}
            >
              <ArrowLeft className="text-gray-700" />
            </button>
          </li> */}
          <li className="relative m-1 py-1">
            <a
              className="
                flex items-center text-sm py-4 px-6 h-12 
                bg-gray-50 border border-gray-400 shadow-md 
                overflow-hidden whitespace-nowrap rounded-lg
                hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
              "
            >
              <Box />
              <span>Inserir Vetor</span>
            </a>
          </li>
          <li className="relative m-1 py-1">
            <a
              className="
                flex items-center text-sm py-4 px-6 h-12 
                bg-gray-50 border border-gray-400 shadow-md 
                overflow-hidden  whitespace-nowrap rounded-lg
                hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
              "
            >
              <Box />
              <span>Inserir Transformações</span>
              <ChevronDown />
            </a>
            <ul className="relative accordion-collapse collapse">
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  Transformação Padrão
                </a>
              </li>
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  Reflexão
                </a>
              </li>
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  Cisalhamento
                </a>
              </li>
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  Contração
                </a>
              </li>
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  Expansão
                </a>
              </li>
            </ul>
          </li>
          <li className="relative m-1 py-1">
            <a
              className="
              flex items-center text-sm py-4 px-6 h-12 
              bg-gray-50 border border-gray-400 shadow-md 
              overflow-hidden  whitespace-nowrap rounded-lg
              hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
            "
            >
              <Box />
              <span>Executar Transformações</span>
            </a>
          </li>
        </ul>
      </nav>
      <button
        className="
          rounded-full h-10 w-10 m-4 z-50
          flex items-center justify-center 
          bg-gray-50 bg-opacity-75 border border-gray-400 
        "
        onClick={toggleSideBar}
      >
        <ArrowLeft className="text-gray-700" />
      </button>
    </>
  );
};

export default SideBar;
