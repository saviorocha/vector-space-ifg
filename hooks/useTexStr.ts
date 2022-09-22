import { evaluate } from "mathjs";
import { useState } from "react";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext, useNameContext } from "../context";
import {
  validateVectorName,
  validateVectorValues
} from "../utils";

const useTexStr = () => {
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();

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

  const vectorFromTex = (vectorStr: string): Vector | null => {
    const expression: string = vectorStr
      .replace("π", "pi")
      .replace("√", "sqrt")
      .replace("²", "^2")
      .replace("³", "^3")
      .replace("×", "*")
      .replace("₀", "_{0}")
      .replace("₁", "_{1}")
      .replace("₂", "_{2}")
      .replace("₃", "_{3}")
      .replace("₄", "_{4}")
      .replace("₅", "_{5}")
      .replace("₆", "_{6}")
      .replace("₇", "_{7}")
      .replace("₈", "_{8}")
      .replace("₉", "_{9}");

    const name = expression.includes("=")
      ? expression.split("=")[0]
      : `v_{${vectorNameCounter}}`;

    const values = expression.includes("=")
      ? expression
          .split("=")[1]
          .slice(1, self.length - 1)
          .split(",")
      : expression.slice(1, self.length - 1).split(",");

    if (
      !validateVectorName(name) ||
      !validateVectorValues(
        expression.includes("=") ? expression.split("=")[1] : expression
      )
    ) {
      return null;
    }
    // gonna improve this later, sorry
    if (name === `v_{${vectorNameCounter}}`) {
      setVectorNameCounter(vectorNameCounter + 1);
    }
    return new Vector([evaluate(values[0]), evaluate(values[1])], `${name}`);
  };
  return { matrixStrings, vectorFromTex };
};

export default useTexStr;
