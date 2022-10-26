import { FunctionComponent, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import StateList from "../../classes/stateList";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useListEvents from "../../hooks/useListEvents";
import useTexStr from "../../hooks/useTexStr";
import { IVectorTexProps } from "../../interfaces/interfaces";
import RenderTex from "./RenderTex";

/**
 * This component handles vector creation, update and deletion
 */
const VectorTex: FunctionComponent<IVectorTexProps> = ({
  vectorExpression,
  vectorName,
}) => {
  const [expression, setExpression] = useState(vectorExpression);
  const [showTex, setShowTex] = useState(true);

  const { currentPlot } = useNameContext();
  const { vectorDeleteHandler, vectorUpdateHandler } = useListEvents();

  useEffect(() => {
    // console.log("vectorName", vectorName);
  }, []);

  useEffect(() => {
    setExpression(vectorExpression);
    // console.log("vectorExpression", vectorExpression);
  }, [vectorExpression]);

  const handleOnChange = (event: any) => {
    setExpression(event.target.value);
  };

  const handleVectorUpdate = (event: any) => {
    if (event.key === "Enter") {
      vectorUpdateHandler(vectorExpression, event);
      setExpression(event.target.value);
      setShowTex(true);
    }
  };

  const handleDoubleClick = (event: any) => {
    if (event.detail === 2) {
      setShowTex(false);
    }
  };

  return (
    <div className="flex">
      {!vectorName.includes("e_{1}") &&
      !vectorName.includes("e_{2}") &&
      !showTex ? (
        <input
          className="border border-slate-400 w-24"
          onKeyDown={handleVectorUpdate}
          onChange={handleOnChange}
          value={expression}
        />
      ) : (
        <RenderTex
          mathExpression={expression}
          title="Vetor resultante da aplicação da transformação T"
          handleDoubleClick={handleDoubleClick}
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
