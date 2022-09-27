import { Tooltip } from "@mui/material";
import "katex/dist/katex.min.css";
import { FunctionComponent, useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import StateList from "../../classes/stateList";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useTexStr from "../../hooks/useTexStr";
import { IRenderTexProps } from "../../interfaces/interfaces";

const RenderTex: FunctionComponent<IRenderTexProps> = ({
  mathExpression,
  title,
}) => {
  const [expression, setExpression] = useState(mathExpression);
  const [showTex, setShowTex] = useState(true);
  const { updateVector } = useList();
  const { vectorFromTex } = useTexStr();
  const { setList, setStateVecArr } = useListContext();
  const { currentPlot } = useNameContext();

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

  return (
    <div>
      {showTex ? (
        <Tooltip title={title} placement="top">
          <p onClick={currentPlot === 0 ? handleDoubleClick : undefined}>
            <InlineMath math={expression} />
          </p>
        </Tooltip>
      ) : (
        <input
          className="border border-slate-400 w-24"
          onKeyDown={handleVectorUpdate}
          onChange={handleOnChange}
          value={expression}
        />
      )}
    </div>
  );
};

export default RenderTex;
