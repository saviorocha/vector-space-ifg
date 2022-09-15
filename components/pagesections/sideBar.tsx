import { FunctionComponent, useEffect } from "react";
import {
  ArrowUpLeft,
  ChevronDown,
  MousePointer,
  Play,
  Type,
} from "react-feather";
import StateList from "../../classes/stateList";
import Transformation from "../../classes/transformation";
import { useD3Context, useListContext } from "../../context";
import useEvents from "../../hooks/useEvents";
import useList from "../../hooks/useList";
import { ISideBarProps } from "../../interfaces/interfaces";
import BarItem from "../ui/BarItem";

const SideBar: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const { setEvents } = useD3Context();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addTransformation } = useList();
  const { addVectorOnClick } = useEvents();

  const transfromationSubmitHandler = (
    e1: [number, number],
    e2: [number, number]
  ) => {
    const newHead = addTransformation(new Transformation(e1, e2, `T_${stateVecArr.length}`));
    const newList = new StateList(newHead);
    // console.log("newList", newList);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  useEffect(() => {
    // console.log("stateVecArr", stateVecArr);
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("current list", list);
  }, [list]);

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
          leftIcon={<ArrowUpLeft />}
          handleOnClick={() => setEvents([addVectorOnClick])}
        />
        <BarItem
          title={"Inserir Transformações"}
          leftIcon={<Type />}
          rightIcon={<ChevronDown />}
          subItems={[
            {
              title: "Transformação Padrão",
              handleItemOnClick: () =>
                transfromationSubmitHandler([1, 0], [0, 1]),
            },

            {
              title: "Reflexão pelo Eixo y",
              handleItemOnClick: () =>
                transfromationSubmitHandler([-1, 0], [0, 1]),
            },

            {
              title: "Cisalhamento",
              handleItemOnClick: () =>
                transfromationSubmitHandler([1, 0], [2, 1]),
            },

            {
              title: "Contração",
              handleItemOnClick: () =>
                transfromationSubmitHandler([1 / 2, 0], [0, 1 / 2]),
            },

            {
              title: "Expansão",
              handleItemOnClick: () =>
                transfromationSubmitHandler([2, 0], [0, 2]),
            },
          ]}
        />
        <BarItem
          title={"Executar Transformações"}
          leftIcon={<Play />}
          handleOnClick={() => {}}
        />
      </ul>
    </nav>
  );
};

export default SideBar;
