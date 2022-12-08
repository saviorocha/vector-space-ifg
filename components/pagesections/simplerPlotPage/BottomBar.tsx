import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Play, Plus, Type } from "react-feather";
import { useD3Context, useListContext } from "../../../context";
import useD3Events from "../../../hooks/useD3Events";
import useListEvents from "../../../hooks/useListEvents";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";
import VectorIcon from "../../icons/VectorIcon";
import TransformationForm from "../../ui/inputs/TransformationForm";
import BottomItem from "./BottomItem";

const BottomBar = () => {
  const router = useRouter();
  const { transformationSubmitHandler } = useListEvents();
  const { stateVecArr } = useListContext();
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );
  const [isActive, setIsActive] = useState(false);

  const { setEvents } = useD3Context();
  const { addVectorOnClick } = useD3Events();

  const handleTransfromationSubmit = (event: any) => {
    const created = transformationSubmitHandler(event, transformation);
    // setHideAlert(created);
    setToggleTrnInput(false);
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
        {toggleTrnInput && (
          <div id={styles.formcontainer}>
            <TransformationForm onSubmit={handleTransfromationSubmit} />
          </div>
        )}
        <section id={styles.itemslist}>
          <BottomItem
            title={"Adicionar Transformação"}
            icon={<Plus />}
            handleOnClick={() => {
              setToggleTrnInput(!toggleTrnInput);
            }}
          />
          <BottomItem
            title={"Inserir Vetor"}
            icon={<VectorIcon />}
            handleOnClick={vectorSubmitHandler}
          />
          <BottomItem
            title={"Transformações Predefinidas"}
            icon={<Type />}
            handleOnClick={() => {}}
          />
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
