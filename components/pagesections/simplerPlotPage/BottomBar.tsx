import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Play, Plus, Type } from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useD3Context, useListContext, useNameContext } from "../../../context";
import useD3Events from "../../../hooks/useD3Events";
import useList from "../../../hooks/useList";
import useListEvents from "../../../hooks/useListEvents";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";
import VectorIcon from "../../icons/VectorIcon";
import TransformationForm from "../../ui/inputs/TransformationForm";
import BottomItem from "./BottomItem";
import { toast } from "react-hot-toast";

const BottomBar = () => {
  const router = useRouter();
  const { transformationSubmitHandler } = useListEvents();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { setEvents } = useD3Context();
  const { addVectorOnClick } = useD3Events();
  const { addTransformation } = useList();
  const {
    transformationNameCounter,
    setTransformationNameCounter,
    transformationNameArr,
    setTransformationNameArr,
  } = useNameContext();
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );
  const [isActive, setIsActive] = useState(false);

  const handleTransfromationSubmit = (event: any) => {
    event.preventDefault();
    if (stateVecArr.transformationArr.length > 2) {
      toast("Número máximo de transformações atingido");
      return;
    }
    const {successful, message} = transformationSubmitHandler(event, transformation);

    if (!successful) {
      toast(message!);
    }
  };

  /**
   * Predefined transformations
   */
  const handlePredefinedSubmit = (
    e1: [ExpressionType, ExpressionType],
    e2: [ExpressionType, ExpressionType]
  ) => {
    if (stateVecArr.transformationArr.length > 2) {
      toast("Número máximo de transformações atingido");
      return;
    }

    const name = `T_{${transformationNameCounter}}`;
    const newHead = addTransformation(new Transformation(e1, e2, name));
    const newList = new StateList(newHead);
    const trnNameArr = transformationNameArr;
    trnNameArr.push(name);

    // updates context values
    setTransformationNameArr(trnNameArr);
    setTransformationNameCounter(() => transformationNameCounter + 1);
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
        handlePredefinedSubmit(
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
        handlePredefinedSubmit(
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
        handlePredefinedSubmit(
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
        handlePredefinedSubmit(
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
          visibility: isActive ? "visible" : "hidden",
          transform: isActive
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 20px, 0)",
        }}
      >
        <section id={styles.itemslist}>
          <BottomItem title={"Adicionar Transformação"} icon={<Plus />}>
            <div
              id={styles.formcontainer}
              className="
                bg-white border border-zinc-400 
                dark:bg-formblack dark:border-zinc-700
              "
            >
              <TransformationForm onSubmit={handleTransfromationSubmit} />
            </div>
          </BottomItem>
          <BottomItem
            title={"Inserir Vetor"}
            icon={<VectorIcon />}
            handleOnClick={vectorSubmitHandler}
          />
          <BottomItem title={"Transformações Predefinidas"} icon={<Type />}>
            <ul className={styles.transformations}>
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
          className="bg-zinc-300 dark:bg-black"
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
