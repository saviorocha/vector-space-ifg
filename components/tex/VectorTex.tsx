import { FunctionComponent, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import StateList from "../../classes/stateList";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useTexStr from "../../hooks/useTexStr";
import { IVectorTexProps } from "../../interfaces/interfaces";
import RenderTex from "./RenderTex";

const VectorTex: FunctionComponent<IVectorTexProps> = ({
  mathExpression,
  vectorName,
}) => {
  const [expression, setExpression] = useState(mathExpression);
  const [showTex, setShowTex] = useState(true);

  const { currentPlot } = useNameContext();
  const { vectorFromTex } = useTexStr();
  const { updateVector, removeVector } = useList();
  const { list, setList, setStateVecArr } = useListContext();

  useEffect(() => {
    console.log("vectorName", vectorName);
  }, []);

  useEffect(() => {
    setExpression(mathExpression);
    // console.log("mathExpression", mathExpression);
  }, [mathExpression]);

  const handleOnChange = (event: any) => {
    setExpression(event.target.value);
  };

  const handleVectorUpdate = (event: any) => {
    if (event.key === "Enter") {
      const newVector = vectorFromTex(event.target.value);
      const prevVectorName = vectorFromTex(mathExpression)?.name;
      if (!newVector || !prevVectorName) {
        alert("naum");
        return;
      }
      const newHead = updateVector(newVector, prevVectorName);
      const newList = new StateList(newHead);
      setList(newList);
      setStateVecArr(newList.toArray());

      event.target.value = "";
      setExpression(event.target.value);
      setShowTex(true);
    }
  };

  const handleDoubleClick = (event: any) => {
    if (event.detail === 2) {
      setShowTex(false);
    }
  };
  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
  };
  return (
    <div>
      {showTex ? (
        <RenderTex
          mathExpression={expression}
          title="Vetor resultante da aplicação da transformação T"
          handleDoubleClick={handleDoubleClick}
        />
      ) : (
        <input
          className="border border-slate-400 w-24"
          onKeyDown={handleVectorUpdate}
          onChange={handleOnChange}
          value={expression}
        />
      )}
      {!vectorName.includes("e_{1}") &&
      !vectorName.includes("e_{2}") &&
      currentPlot === 0 ? (
        <button onClick={() => vectorDeleteHandler(vectorName)}>
          <Trash2 />
        </button>
      ) : null}
    </div>
  );
};

export default VectorTex;
