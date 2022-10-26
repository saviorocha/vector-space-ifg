import { Tooltip } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Plus } from "react-feather";
import StateList from "../../../classes/stateList";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import useList from "../../../hooks/useList";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import VectorTex from "../../tex/VectorTex";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const [toggleVecInput, setToggleVecInput] = useState(false);

  const { vectorFromTex } = useTexStr();
  const { addVector } = useList();
  const { setList, setStateVecArr } = useListContext();
  /**
   * Adds a new vector to the list
   */
  const vectorSubmitHandler = (event: any) => {
    if (event.key === "Enter") {
      // triggered by enter key
      const newVector = vectorFromTex(event.target.value);

      if (!newVector) {
        alert("nome ou valores do vetor inválidos");
        return;
      }
      const newHead = addVector(newVector);
      const newList = new StateList(newHead);

      // updates list
      setList(newList);
      setStateVecArr(newList.toArray());

      event.target.value = "";
    }
  };
  return (
    <div
      className="
        rounded-md w-1/3 h-24 overflow-auto
        flex flex-col items-center justify-center
        bg-white border border-gray-400
        text-sm shadow-md"
    >
      <ul>
        {vectors.map((vec: Vector, i: number) => {
          return (
            <li key={i}>
              <VectorTex
                vectorExpression={`${vec.name}=(${vec.x},${vec.y})`}
                vectorName={vec.name}
              />
            </li>
          );
        })}
      </ul>
      {plotIndex === 0 && (
        <div className="flex items-center justify-center">
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
              className="border border-slate-400 w-10"
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
