import { useState } from "react";
import { Plus } from "react-feather";
import StateList from "../../classes/stateList";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useTexStr from "../../hooks/useTexStr";
import VectorTex from "../tex/VectorTex";

const BottomVectors = () => {
  const [toggleVecInput, setToggleVecInput] = useState(false);

  const { currentPlot } = useNameContext();
  const { vectorFromTex } = useTexStr();
  const { addVector, removeVector } = useList();
  const { setList, stateVecArr, setStateVecArr } = useListContext();



  const vectorSubmitHandler = (event: any) => {
    if (event.key === "Enter") {
      const newVector = vectorFromTex(event.target.value);

      if (!newVector) {
        alert("nome ou valores do vetor inválidos");
        return;
      }
      const newHead = addVector(newVector);
      const newList = new StateList(newHead);
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
                <VectorTex mathExpression={`${vec.name}=(${vec.x},${vec.y})`} vectorName={vec.name} />
            </li>
          );
        })}
      </ul>
      {currentPlot === 0 ? (
        <button
          className="absolute bottom-1 left-1"
          onClick={() => {
            setToggleVecInput(!toggleVecInput);
          }}
        >
          <Plus />
        </button>
      ) : null}
      {toggleVecInput && currentPlot === 0 ? (
        <input
          className="border border-slate-400"
          onKeyDown={vectorSubmitHandler}
          //   value={input}
          //   onChange={(e) => onChangeInput(e)}
        />
      ) : null}
    </>
  );
};

export default BottomVectors;
