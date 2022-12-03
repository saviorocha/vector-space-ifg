import { Tooltip } from "@mui/material";
import { useRef } from "react";
import { Plus } from "react-feather";
import { useListContext, useNameContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import VectorTex from "../../tex/VectorTex";

/**
 * Component for showing on the bottom bar the vectors referent to the current transformation state
 */
const BottomVectors = () => {
  const inputRef = useRef(null);

  const { currentPlot } = useNameContext();
  const { stateVecArr } = useListContext();
  const { vectorSubmitHandler } = useListEvents();

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

  return (
    <>
      <ul>
        {stateVecArr.vectorArr[currentPlot].map((vec, i) => {
          return (
            <li key={i}>
              <VectorTex
                // vectorExpression={`${vec.name}=(${vec.x},${vec.y})`}
                vector={vec}
                currentPlot={currentPlot}
              />
            </li>
          );
        })}
      </ul>

      {currentPlot === 0 && (
        <footer>
          <input
            className="border border-slate-400"
            onKeyDown={handleVectorInputSubmit}
            ref={inputRef}
            //   value={input}
            //   onChange={(e) => onChangeInput(e)}
          />
          <Tooltip title="Adicionar um novo vetor">
            <button
              className="absolute bottom-1 left-1"
              onClick={handleVectorBtnSubmit}
            >
              <Plus />
            </button>
          </Tooltip>
        </footer>
      )}
    </>
  );
};

export default BottomVectors;
