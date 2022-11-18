import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { ChevronDown, MousePointer, Play, Type } from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useD3Context, useListContext } from "../../../context";
import useD3Events from "../../../hooks/useD3Events";
import useList from "../../../hooks/useList";
import { ISideBarProps } from "../../../interfaces/interfaces";
import VectorIcon from "../../icons/VectorIcon";
import SideBar from "../../ui/sideBar/SideBar";
import BarItem from "../../ui/sideBar/BarItem";

const SideBarEditPage: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const router = useRouter();
  const { setEvents } = useD3Context();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addTransformation } = useList();
  const { addVectorOnClick } = useD3Events();

  /**
   * Predefined SideBar transformations
   */
  const transfromationSubmitHandler = (
    e1: [ExpressionType, ExpressionType],
    e2: [ExpressionType, ExpressionType]
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
        {/* <BarItem
          title={"Movimentar"}
          leftIcon={<MousePointer />}
          handleOnClick={() => setEvents([])}
        /> */}
        <BarItem
          title={"Inserir Vetor"}
          leftIcon={<VectorIcon />}
          handleOnClick={vectorSubmitHandler}
        />
        <BarItem
          title={"Inserir Transformações"}
          leftIcon={<Type />}
          rightIcon={<ChevronDown />}
          subItems={[
            {
              title: "Reflexão pelo Eixo y",
              handleItemOnClick: () =>
                transfromationSubmitHandler(
                  [
                    { value: -1, texExpression: "-1" },
                    { value: 0, texExpression: "0" },
                  ],
                  [
                    { value: 0, texExpression: "0" },
                    { value: 1, texExpression: "1" },
                  ]
                ),
            },

            {
              title: "Cisalhamento",
              handleItemOnClick: () =>
                transfromationSubmitHandler(
                  [
                    { value: 1, texExpression: "1" },
                    { value: 0, texExpression: "0" },
                  ],
                  [
                    { value: 2, texExpression: "2" },
                    { value: 1, texExpression: "1" },
                  ]
                ),
            },

            {
              title: "Contração",
              handleItemOnClick: () =>
                transfromationSubmitHandler(
                  [
                    { value: 1 / 2, texExpression: "\\frac{1}{2}" },
                    { value: 0, texExpression: "0" },
                  ],
                  [
                    { value: 0, texExpression: "0" },
                    { value: 1 / 2, texExpression: "\\frac{1}{2}" },
                  ]
                ),
            },

            {
              title: "Dilatação",
              handleItemOnClick: () =>
                transfromationSubmitHandler(
                  [
                    { value: 2, texExpression: "2" },
                    { value: 0, texExpression: "0" },
                  ],
                  [
                    { value: 0, texExpression: "0" },
                    { value: 2, texExpression: "2" },
                  ]
                ),
            },
          ]}
        />
        <BarItem
          title={"Executar Transformações"}
          leftIcon={<Play />}
          handleOnClick={() => {
            router.push("/transformacaolinear/animartransformacoes");
          }}
        />
      </ul>
    </SideBar>
  );
};

export default SideBarEditPage;
