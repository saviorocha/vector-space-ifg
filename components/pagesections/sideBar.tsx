import { FunctionComponent, useState } from "react";
import { Box, ChevronDown, MousePointer, Play, Type } from "react-feather";
import { useListContext } from "../../context";
import { ISideBarProps } from "../../interfaces/interfaces";
import ClickVectorEvent from "../d3/clickVectorEvent";
import PlotComponent from "../d3/plotComponent";
import BarItem from "../ui/BarItem";
import * as d3 from "d3";
import useList from "../../hooks/useList";
import Vector from "../../classes/vector";
import StateList from "../../classes/stateList";

const SideBar: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const { addVector, addTransformation, removeVector, removeTransformation } =
    useList();
  const { list, setList, setStateVecArr } = useListContext();

  const onClick = (event: any) => {
    const clickX = d3.scaleLinear().domain([0, 380]).range([-5, 5]);
    const clickY = d3.scaleLinear().domain([0, 360]).range([5, -5]);
    
    // const xCoord = clickX(d3.pointer(event)[0]);
    // const yCoord = clickY(d3.pointer(event)[1]);

    // (Math.round(num * 100) / 100).toFixed(2); - 1.34252 -> 1.34
    const newHead = addVector(
      new Vector(
        [clickX(d3.pointer(event)[0]), clickY(d3.pointer(event)[1])]
        // "#bb00ff"
      )
    );

    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(newList.toArray());
  };

  function clickEvent() {
    const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
    const dimensions: Dimesion = {
      margin: marginValues,
      width: 460 - marginValues.left - marginValues.right,
      height: 400 - marginValues.top - marginValues.bottom,
    };
    d3.select("#zoom-rect").remove();
    d3
      .select("#plane")
      .append("rect")
      .attr("id", "clicktest")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .on("click", onClick);
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
        <BarItem
          title={"Inserir Vetor"}
          leftIcon={<Box />}
          handleOnClick={clickEvent}
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
