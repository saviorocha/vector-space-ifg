import { Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Plus } from "react-feather";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import VectorTex from "../../tex/VectorTex";
import HoverableComponent from "../../ui/HoverableComponent";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const [toggleVecInput, setToggleVecInput] = useState(false);
  const { vectorSubmitHandler } = useListEvents();
  const { vectorMatrixMultiplication } = useTexStr();
  const { stateVecArr } = useListContext();

  useEffect(() => {
    // console.log("vectors", vectors)
    // console.log(
    //   "trn",
    //   vectorMatrixMultiplication(
    //     stateVecArr.transformationArr[plotIndex],
    //     vectors[0]
    //   )
    // );
  }, []);

  return (
    <div
      className="
        rounded-md w-1/2 h-24 overflow-auto
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md"
    >
      <ul>
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
        <div className="w-1/2 flex items-center justify-start">
          <Tooltip title="Adicionar um novo vetor">
            <button
              onClick={() => {
                setToggleVecInput(!toggleVecInput);
              }}
            >
              <Plus />
            </button>
          </Tooltip>
          {toggleVecInput && (
            <input
              className="border border-slate-400 w-20"
              onKeyDown={vectorSubmitHandler}
              //   value={input}
              //   onChange={(e) => onChangeInput(e)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PlotVectors;
