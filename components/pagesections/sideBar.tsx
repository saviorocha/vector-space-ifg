import { FunctionComponent, useState } from "react";
import { Box, ChevronDown, MousePointer, Play, Type } from "react-feather";
import { useListContext } from "../../context";
import { ISideBarProps } from "../../interfaces/interfaces";
import ClickVectorEvent from "../d3/clickVectorEvent";
import PlotComponent from "../d3/plotComponent";
import BarItem from "../ui/BarItem";

const SideBar: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const [d3EventComponent, setD3EventComponent] = useState<any>();
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );
  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };

  function clickEvent() {
    setD3EventComponent(new ClickVectorEvent(dimensions));
    console.log(d3EventComponent);
  }

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
        <BarItem title={"Movimentar"} leftIcon={<MousePointer />} />
        <BarItem title={"Inserir Vetor"} leftIcon={<Box />} handleOnClick={clickEvent}/>
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
