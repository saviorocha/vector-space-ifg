import { Tooltip } from "@mui/material";
import "katex/dist/katex.min.css";
import { FunctionComponent } from "react";
import { InlineMath } from "react-katex";
import { useNameContext } from "../../context";
import { IRenderTexProps } from "../../interfaces/interfaces";

/**
 * This component uses KaTeX library to render inline math expressions
 */
const RenderTex: FunctionComponent<IRenderTexProps> = ({
  mathExpression,
  title = "",
  handleDoubleClick = undefined,
  classStyle = "",
}) => {
  const { currentPlot } = useNameContext();

  return (
    <Tooltip title={title} placement="top">
      <p className={classStyle} onClick={currentPlot === 0 ? handleDoubleClick : undefined}>
        <InlineMath math={mathExpression} />
      </p>
    </Tooltip>
  );
};

export default RenderTex;
