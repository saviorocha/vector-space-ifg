import { FunctionComponent, useEffect, useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import useListEvents from "../../hooks/useListEvents";
import { IVectorTexProps } from "../../interfaces/interfaces";
import RenderTex from "./RenderTex";

/**
 * This component handles vector criacao, update and deletion
 */
const VectorTex: FunctionComponent<IVectorTexProps> = ({
  vectorExpression,
  vectorName,
  currentPlot,
}) => {
  const [expression, setExpression] = useState(vectorExpression);
  const [showTex, setShowTex] = useState(true);

  // const { currentPlot } = useNameContext();
  const { vectorDeleteHandler, vectorUpdateHandler } = useListEvents();

  useEffect(() => {
    // console.log("vectorName", vectorName);
    // console.log("vectorExpression", vectorExpression);
    // console.log("expression", expression);
  }, [expression]);

  useEffect(() => {
    setExpression(vectorExpression);
    // console.log("vectorExpression", vectorExpression);
  }, [vectorExpression]);

  const handleOnChange = (event: any) => {
    if (event.target.value) {
      setExpression(event.target.value);
    }
  };

  const handleVectorUpdate = (event: any) => {
    if (event.key === "Enter") {
      vectorUpdateHandler(vectorExpression, event);
      setShowTex(true);
    }
    if (event.target.value) {
      // checks for empty strings
      setExpression(event.target.value);
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
      currentPlot === 0 ? (
        <>
          <button
            onClick={() => vectorDeleteHandler(vectorName)}
            className="ml-1"
          >
            <Trash2 size={19} />
          </button>
          <button onClick={() => {}} className="ml-1">
            <Edit2 size={19} />
          </button>
        </>
      ) : null}
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
          handleDoubleClick={handleDoubleClick}
        />
      )}
    </div>
  );
};

export default VectorTex;
