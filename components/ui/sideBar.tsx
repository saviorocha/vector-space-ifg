import React, { useRef, useState } from "react";
import { ArrowLeft, Box, ChevronDown } from "react-feather";
import BarItem from "./barItem";

const barItems = {
  insertVector: { title: "Inserir Vetor", icon: <Box /> },
  insertTransformation: "Inserir Transformações",
  executeTransformation: "Executar Transformações",
};
const SideBar = () => {
  const sideBarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const Icon = () => {
    return <Box />;
  };
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
        <BarItem
          title={"Inserir Vetor"}
          Icon={() => {
            return <Box />;
          }}
        />
        <BarItem
          title={"Inserir Transformações"}
          Icon={() => {
            return <ChevronDown />;
          }}
          subItems={[
            "Transformação Padrão",
            "Reflexão",
            "Cisalhamento",
            "Contração",
            "Expansão",
          ]}
        />
        <BarItem
          title={"Executar Transformações"}
          Icon={() => {
            return <Box />;
          }}
        />
      </ul>
    </nav>
    // <button
    //   className="
    //     rounded-full h-10 w-10 m-4 z-50
    //     flex items-center justify-center
    //     bg-gray-50 bg-opacity-75 border border-gray-400
    //   "
    //   onClick={toggleSideBar}
    // >
    //   <ArrowLeft className="text-gray-700" />
    // </button>
  );
};

export default SideBar;
