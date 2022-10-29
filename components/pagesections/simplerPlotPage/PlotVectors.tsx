import { Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Plus } from "react-feather";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import VectorTex from "../../tex/VectorTex";
import HoverableComponent from "../../ui/HoverableComponent";
import styles from "../../../styles/modules/input.module.css";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const inputRef = useRef(null);
  const { vectorSubmitHandler } = useListEvents();
  const { vectorMatrixMultiplication } = useTexStr();
  const { stateVecArr } = useListContext();

  const handleVectorInputSubmit = (event: any) => {
    if (event.key === "Enter") {
      vectorSubmitHandler(event.target.value)
      event.target.value = "";
    }
  }

  const handleVectorBtnSubmit = () => {
    if (inputRef.current) {
      // @ts-ignore
      vectorSubmitHandler(inputRef.current.value)
      // @ts-ignore
      inputRef.current.value = "";
    }
  }

  return (
    <div
      className="
        rounded-md w-1/2 h-24
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md"
    >
      <ul className="overflow-scroll">
        {vectors.map((vec: Vector, i: number) => {
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
            ref={inputRef}
            className={styles.inp}
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
