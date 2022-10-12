import { evaluate } from "mathjs";
import Vector from "../classes/vector";
import { useListContext, useNameContext } from "../context";
import { validateVectorName, validateVectorValues } from "../utils";

const useTexStr = () => {
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();
  const { vectorNameCounter, setVectorNameCounter, transformationVars } =
    useNameContext();

  const matrixStrings = () => {
    const transformation = stateVecArr.transformationArr[currentPlot];
    const a = transformationVars[0];
    const b = transformationVars[1];
    return [
      `${transformation.name}(${a}, ${b}) = 
        (${defString(
          transformation.e1[0],
          transformation.e2[0],
          transformationVars
        )}, ${defString(
        transformation.e1[1],
        transformation.e2[1],
        transformationVars
      )})`
        .split(" ")
        .join("")
        .trim()
        .replace(/\n/g, ""),
      String.raw`
        ${transformation.name}(${a}, ${b}) = \begin{bmatrix}
        ${transformation.e1[0]} & ${transformation.e2[0]}\\
        ${transformation.e1[1]} & ${transformation.e2[1]}
          \end{bmatrix}\begin{bmatrix}
            ${a}\\
            ${b}
          \end{bmatrix}
        `,
    ];
  };

  const defString = (
    num1: number,
    num2: number,
    names: [string, string]
  ): string => {
    if (num1 === 0 && num2 === 0) {
      return "0";
    }

    return `${validation(num1, names[0])}${
      num1 === 0 || num2 === 0 ? "" : "+"
    }${validation(num2, names[1])}`;
  };

  const validation = (num: number, name: string) => {
    if (num === 1) {
      return name;
    } else if (num === 0) {
      return "";
    } else {
      return `${num}${name}`;
    }
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
