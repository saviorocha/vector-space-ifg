import { FunctionComponent, useEffect } from "react";
import {
  ArrowUpLeft,
  ChevronDown,
  MousePointer,
  Play,
  Type,
} from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useD3Context, useListContext } from "../../../context";
import useEvents from "../../../hooks/useEvents";
import useList from "../../../hooks/useList";
import { ISideBarProps } from "../../../interfaces/interfaces";
import BarItem from "../../ui/BarItem";
import { useRouter } from "next/router";
import SideBar from "../../ui/SideBar";

const SideBarEditPage: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const router = useRouter();
  const { setEvents } = useD3Context();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addTransformation } = useList();
  const { addVectorOnClick } = useEvents();

  /**
   * Predefined SideBar transformations 
   */
  const transfromationSubmitHandler = (
    e1: [number, number],
    e2: [number, number]
  ) => {
    const newHead = addTransformation(
      new Transformation(e1, e2, `T_${stateVecArr.vectorArr.length}`)
    );
    const newList = new StateList(newHead);
    // console.log("newList", newList);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  /**
   * Sets the click event on the plane to add a new vector
   */
  const vectorSubmitHandler = () => {
    document.getElementById("myPlane")!.onclick = () => {
      setEvents([]);
    };
    setEvents([addVectorOnClick]);
  };

  useEffect(() => {
    // console.log("stateVecArr", stateVecArr);
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("current list", list);
  }, [list]);

  return (
    <SideBar
      // className={sidebarClass}
      sideBarRef={sideBarRef}
      sideBarStyle={sideBarStyle}
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
          handleOnClick={vectorSubmitHandler}
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
              title: "Dilatação",
              handleItemOnClick: () =>
                transfromationSubmitHandler([2, 0], [0, 2]),
            },
          ]}
        />
        <BarItem
          title={"Executar Transformações"}
          leftIcon={<Play />}
          handleOnClick={() => {
            router.push("/animationplane");
          }}
        />
      </ul>
    </SideBar>
  );
};

export default SideBarEditPage;