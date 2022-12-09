import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Play, Plus, Type } from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useD3Context, useListContext } from "../../../context";
import useD3Events from "../../../hooks/useD3Events";
import useList from "../../../hooks/useList";
import useListEvents from "../../../hooks/useListEvents";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";
import VectorIcon from "../../icons/VectorIcon";
import TransformationForm from "../../ui/inputs/TransformationForm";
import BottomItem from "./BottomItem";

const BottomBar = () => {
  const router = useRouter();
  const { transformationSubmitHandler } = useListEvents();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );
  const [isActive, setIsActive] = useState(false);

  const { setEvents } = useD3Context();
  const { addVectorOnClick } = useD3Events();
  const { addTransformation } = useList();

  const handleTransfromationSubmit = (event: any) => {
    const created = transformationSubmitHandler(event, transformation);
    // setHideAlert(created);
    setToggleTrnInput(false);
  };

  /**
   * Predefined transformations
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
    setTransformation(
      stateVecArr.transformationArr[stateVecArr.transformationArr.length - 1]
    );
  }, [stateVecArr]);

  const subItems = [
    {
      title: "Reflexão pelo Eixo y",
      handleItemOnClick: () =>
        transfromationSubmitHandler(
          [
            { value: -1, texExpression: "-1", mathExpression: "-1" },
            { value: 0, texExpression: "0", mathExpression: "0" },
          ],
          [
            { value: 0, texExpression: "0", mathExpression: "0" },
            { value: 1, texExpression: "1", mathExpression: "1" },
          ]
        ),
    },

    {
      title: "Cisalhamento",
      handleItemOnClick: () =>
        transfromationSubmitHandler(
          [
            { value: 1, texExpression: "1", mathExpression: "1" },
            { value: 0, texExpression: "0", mathExpression: "0" },
          ],
          [
            { value: 2, texExpression: "2", mathExpression: "2" },
            { value: 1, texExpression: "1", mathExpression: "1" },
          ]
        ),
    },

    {
      title: "Contração",
      handleItemOnClick: () =>
        transfromationSubmitHandler(
          [
            {
              value: 1 / 2,
              texExpression: "\\frac{1}{2}",
              mathExpression: "1/2",
            },
            { value: 0, texExpression: "0", mathExpression: "0" },
          ],
          [
            { value: 0, texExpression: "0", mathExpression: "0" },
            {
              value: 1 / 2,
              texExpression: "\\frac{1}{2}",
              mathExpression: "1/2",
            },
          ]
        ),
    },

    {
      title: "Dilatação",
      handleItemOnClick: () =>
        transfromationSubmitHandler(
          [
            { value: 2, texExpression: "2", mathExpression: "2" },
            { value: 0, texExpression: "0", mathExpression: "0" },
          ],
          [
            { value: 0, texExpression: "0", mathExpression: "0" },
            { value: 2, texExpression: "2", mathExpression: "2" },
          ]
        ),
    },
  ];

  return (
    <footer>
      <section
        id={styles.bottombar}
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 20px, 0)",
        }}
      >
        <section id={styles.itemslist}>
          <BottomItem title={"Adicionar Transformação"} icon={<Plus />}>
            <div id={styles.formcontainer}>
              <TransformationForm onSubmit={handleTransfromationSubmit} />
            </div>
          </BottomItem>
          <BottomItem
            title={"Inserir Vetor"}
            icon={<VectorIcon />}
            handleOnClick={vectorSubmitHandler}
          />
          <BottomItem title={"Transformações Predefinidas"} icon={<Type />}>
            <ul className="relative accordion-collapse collapse w-44">
              <li className="relative">
                {subItems.map(({ title, handleItemOnClick }, i) => {
                  return (
                    <a
                      key={i}
                      className={styles.transformationlist}
                      onClick={handleItemOnClick}
                    >
                      {title}
                    </a>
                  );
                })}
              </li>
            </ul>
          </BottomItem>
          <BottomItem
            title={"Executar Transformações"}
            icon={<Play />}
            handleOnClick={() => {
              router.push("/transformacaolinear/animartransformacoes");
            }}
          />
        </section>
      </section>
      <Tooltip title={`${isActive ? "Esconder" : "Mostrar"} barra de funções`}>
        <button
          id={styles.bottombutton}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? <ChevronDown /> : <ChevronUp />}
        </button>
      </Tooltip>
    </footer>
  );
};

export default BottomBar;
