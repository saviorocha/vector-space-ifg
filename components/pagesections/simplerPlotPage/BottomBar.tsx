import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Play, Plus, Type } from "react-feather";
import { useListContext } from "../../../context";
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

  const handleTransfromationSubmit = (event: any) => {
    const created = transformationSubmitHandler(event, transformation);
    // setHideAlert(created);
    setToggleTrnInput(false);
  };

  useEffect(() => {
    setTransformation(
      stateVecArr.transformationArr[stateVecArr.transformationArr.length - 1]
    );
  }, [stateVecArr]);

  return (
    <section id={styles.bottombar}>
      <section className={styles.itembox}>
        {toggleTrnInput ? (
          <TransformationForm onSubmit={handleTransfromationSubmit} />
        ) : (
          <button
            onClick={() => {
              setToggleTrnInput(true);
            }}
          >
            <Plus />
            <p>Adicionar Transformação</p>
          </button>
        )}
      </section>
      <BottomItem title={"Inserir Vetor"} icon={<VectorIcon />} />
      <BottomItem title={"Transformações Predefinidas"} icon={<Type />} />
      <BottomItem title={"Executar Transformações"} icon={<Play />} />
    </section>
  );
};

export default BottomBar;
