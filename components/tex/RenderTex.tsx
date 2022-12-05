import { Tooltip } from "@mui/material";
import "katex/dist/katex.min.css";
import { FunctionComponent, useEffect } from "react";
import { InlineMath } from "react-katex";
import { useNameContext } from "../../context";
import { IRenderTexProps } from "../../interfaces/interfaces";

/**
 * This component uses a KaTeX library to render inline math expressions
 */
const RenderTex: FunctionComponent<IRenderTexProps> = ({
  mathExpression,
  title = "",
  handleDoubleClick = undefined,
  classStyle = "",
}) => {
  const { currentPlot } = useNameContext();

  useEffect(() => {
    console.log(mathExpression)
  }, [])

  return (
    <Tooltip title={title} placement="top">
      <p className={classStyle} onClick={currentPlot === 0 ? handleDoubleClick : undefined}>
        <InlineMath math={mathExpression} />
      </p>
    </Tooltip>
  );
};

export default RenderTex;
