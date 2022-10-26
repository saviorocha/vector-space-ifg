import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Plus } from "react-feather";
import { useListContext, useNameContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import VectorTex from "../../tex/VectorTex";

/**
 * Component for showing on the bottom bar the vectors referent to the current transformation state
 */
const BottomVectors = () => {
  const [toggleVecInput, setToggleVecInput] = useState(false);

  const { currentPlot } = useNameContext();
  const { stateVecArr } = useListContext();
  const { vectorSubmitHandler } = useListEvents();

  return (
    <>
      <ul>
        {stateVecArr.vectorArr[currentPlot].map((vec, i) => {
          return (
            <li key={i}>
              <VectorTex
                vectorExpression={`${vec.name}=(${vec.x},${vec.y})`}
                vectorName={vec.name}
                currentPlot={currentPlot}
              />
            </li>
          );
        })}
      </ul>

      {currentPlot === 0 && (
        <Tooltip title="Adicionar um novo vetor">
          <button
            className="absolute bottom-1 left-1"
            onClick={() => {
              setToggleVecInput(!toggleVecInput);
            }}
          >
            <Plus />
          </button>
        </Tooltip>
      )}

      {toggleVecInput && currentPlot === 0 && (
        <input
          className="border border-slate-400"
          onKeyDown={vectorSubmitHandler}
          //   value={input}
          //   onChange={(e) => onChangeInput(e)}
        />
      )}
    </>
  );
};

export default BottomVectors;
