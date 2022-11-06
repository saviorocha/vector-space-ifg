import { Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Plus } from "react-feather";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import VectorTex from "../../tex/VectorTex";
import HoverableComponent from "../../ui/dataDisplay/HoverableComponent";
import styles from "../../../styles/modules/ui/input.module.css";
import { useConfigContext } from "../../../context/ConfigContext";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const inputRef = useRef(null);
  const [vectorRender, setVectorRender] = useState(vectors);
  const { showBasisVectors } = useConfigContext();
  const { vectorSubmitHandler } = useListEvents();
  const { vectorMatrixMultiplication } = useTexStr();
  const { stateVecArr } = useListContext();

  const handleVectorInputSubmit = (event: any) => {
    if (event.key === "Enter") {
      vectorSubmitHandler(event.target.value);
      event.target.value = "";
    }
  };

  const handleVectorBtnSubmit = () => {
    if (inputRef.current) {
      // @ts-ignore
      vectorSubmitHandler(inputRef.current.value);
      // @ts-ignore
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    setVectorRender(
      vectors.filter((vector: Vector) => {
        return showBasisVectors ? vector : !vector.isBasisVector;
      })
    );
  }, [showBasisVectors, vectors]);

  return (
    <div
      className="
        rounded-md w-11/12 h-36
        flex flex-col items-center justify-between
        bg-white border border-gray-400
        text-sm shadow-md dark:bg-zinc-900 dark:border-neutral-600
      "
        
    >
      <ul className="overflow-scroll" id={styles.vectorlist}>
        {vectorRender.map((vec: Vector, i: number) => {
          return (
            <li key={i}>
              {plotIndex !== 0 ? (
                <HoverableComponent
                  hoverTexExpression={vectorMatrixMultiplication(
                    stateVecArr.transformationArr[plotIndex],
                    vec
                  )}
                >
                  <VectorTex
                    vectorExpression={`${vec.name}=(${vec.x},${vec.y})`}
                    vectorName={vec.name}
                    currentPlot={plotIndex}
                  />
                </HoverableComponent>
              ) : (
                <VectorTex
                  vectorExpression={`${vec.name}=(${vec.x},${vec.y})`}
                  vectorName={vec.name}
                  currentPlot={plotIndex}
                />
              )}
            </li>
          );
        })}
      </ul>
      {plotIndex === 0 && (
        <footer className={styles.inputcontainer}>
          <input
            placeholder="Inserir vetor"
            ref={inputRef}
            className={styles.inpvec}
            onKeyDown={handleVectorInputSubmit}
            //   value={input}
            //   onChange={(e) => onChangeInput(e)}
          />
          <Tooltip title="Adicionar um novo vetor">
            <button onClick={handleVectorBtnSubmit}>
              <Plus size={24} className={styles.btn} />
            </button>
          </Tooltip>
        </footer>
      )}
    </div>
  );
};

export default PlotVectors;
