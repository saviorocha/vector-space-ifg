import { useState } from "react";
import { Plus } from "react-feather";
import StateList from "../../classes/stateList";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useTexStr from "../../hooks/useTexStr";
import VectorTex from "../tex/VectorTex";

/**
 * Component for showing on the bottom bar the vectors referent to the current transformation state
 */
const BottomVectors = () => {
  const [toggleVecInput, setToggleVecInput] = useState(false);

  const { currentPlot } = useNameContext();
  const { vectorFromTex } = useTexStr();
  const { addVector } = useList();
  const { setList, stateVecArr, setStateVecArr } = useListContext();

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
    <>
      <ul>
        {stateVecArr.vectorArr[currentPlot].map((vec, i) => {
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

      {currentPlot === 0 && (
        <button
          className="absolute bottom-1 left-1"
          onClick={() => {
            setToggleVecInput(!toggleVecInput);
          }}
        >
          <Plus />
        </button>
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
