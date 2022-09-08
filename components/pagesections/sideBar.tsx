import { FunctionComponent } from "react";
import { Box, ChevronDown, MousePointer, Play, Type } from "react-feather";
import { useD3Context } from "../../context";
import useEvents from "../../hooks/useEvents";
import { ISideBarProps } from "../../interfaces/interfaces";
import BarItem from "../ui/BarItem";

const SideBar: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const { setEvents } = useD3Context();
  const { addVectorOnClick } = useEvents();

  return (
    <nav
      // className={sidebarClass}
      ref={sideBarRef}
      style={sideBarStyle}
      className="
        w-60 h-full px-1 top-0 left-0 fixed shadow-md   
        bg-gray-100 border-r border-gray-300 overflow-hidden
      "
      // dark:bg-darklight dark:border-black
    >
      <ul className="relative">
        <BarItem
          title={"Movimentar"}
          leftIcon={<MousePointer />}
          handleOnClick={() => setEvents([])}
        />
        <BarItem
          title={"Inserir Vetor"}
          leftIcon={<Box />}
          handleOnClick={() => setEvents([addVectorOnClick])}
        />
        <BarItem
          title={"Inserir Transformações"}
          leftIcon={<Type />}
          rightIcon={<ChevronDown />}
          subItems={[
            "Transformação Padrão",
            "Reflexão",
            "Cisalhamento",
            "Contração",
            "Expansão",
          ]}
        />
        <BarItem title={"Executar Transformações"} leftIcon={<Play />} />
      </ul>
    </nav>
  );
};

export default SideBar;
