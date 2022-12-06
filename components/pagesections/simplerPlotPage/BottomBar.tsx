import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Play, Type } from "react-feather";
import { useListContext } from "../../../context";
import useList from "../../../hooks/useList";
import useListEvents from "../../../hooks/useListEvents";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";
import VectorIcon from "../../icons/VectorIcon";
import InfoBox from "../../ui/dataDisplay/InfoBox";
import TransformationForm from "../../ui/inputs/TransformationForm";

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
      <InfoBox customStyles="w-32 h-20 mx-3 my-0">
        {toggleTrnInput ? (
          <TransformationForm onSubmit={handleTransfromationSubmit} />
        ) : (
          <button
            onClick={() => {
              setToggleTrnInput(true);
            }}
          >
            <p>Adicionar Transformação</p>
          </button>
        )}
      </InfoBox>
      <InfoBox customStyles="w-32 h-20 mx-3 my-0">
        <VectorIcon />
        <p>Inserir Vetor</p>
      </InfoBox>
      <InfoBox customStyles="w-52 h-20 mx-3 my-0">
        <Type />
        <p>Transformações Predefinidas</p>
      </InfoBox>
      <InfoBox customStyles="w-48 h-20 mx-3 my-0">
        <Play />
        <p>Executar Transformações</p>
      </InfoBox>
    </section>
  );
};

export default BottomBar;
