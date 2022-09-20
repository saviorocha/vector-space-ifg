import { useState } from "react";
import Transformation from "../classes/transformation";
import { useListContext, useNameContext } from "../context";

const useTexStr = () => {
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();

  const [transformations, setTransformation] = useState<Transformation[]>(
    stateVecArr.transformationArr
  );
  const matrixStrings = () => {
    return transformations.map((trn) => {
      return {
        name: `${trn.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`,
        matrix: String.raw`
        ${trn.name}(a,b) = \begin{bmatrix}
        ${trn.e1[0]} & ${trn.e2[0]}\\
        ${trn.e1[1]} & ${trn.e2[1]}
          \end{bmatrix}\begin{bmatrix}
            a\\
            b
          \end{bmatrix}
        `,
      };
    });
  };
  return { matrixStrings };
};

export default useTexStr;
