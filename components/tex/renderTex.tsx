import { Tooltip } from "@mui/material";
import "katex/dist/katex.min.css";
import { FunctionComponent } from "react";
import { InlineMath } from "react-katex";
import { useNameContext } from "../../context";
import { IRenderTexProps } from "../../interfaces/interfaces";

const RenderTex: FunctionComponent<IRenderTexProps> = ({
  mathExpression,
  title,
  handleDoubleClick = undefined,
}) => {
  const { currentPlot } = useNameContext();

  return (
    <Tooltip title={title} placement="top">
      <p onClick={currentPlot === 0 ? handleDoubleClick : undefined}>
        <InlineMath math={mathExpression} />
      </p>
    </Tooltip>
  );
};

export default RenderTex;
