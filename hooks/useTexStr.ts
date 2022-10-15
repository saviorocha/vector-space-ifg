import { evaluate } from "mathjs";
import Vector from "../classes/vector";
import { useListContext, useNameContext } from "../context";
import { validateVectorName, validateVectorValues } from "../utils";

const useTexStr = () => {
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();
  const { vectorNameCounter, setVectorNameCounter, transformationVars } =
    useNameContext();

  /**
   * Returns a array with different string representations for a transformation
   * @returns KaTeX string array
   */
  const matrixStrings = () => {
    const transformation = stateVecArr.transformationArr[currentPlot];
    const a = transformationVars[0];
    const b = transformationVars[1];
    return [
      // matrix representation
      String.raw`
        ${transformation.name}(${a}, ${b}) = \begin{bmatrix}
        ${transformation.e1[0]} & ${transformation.e2[0]}\\
        ${transformation.e1[1]} & ${transformation.e2[1]}
          \end{bmatrix}\begin{bmatrix}
            ${a}\\
            ${b}
          \end{bmatrix}
        `,

      // matrix transformation
      String.raw`
      \begin{bmatrix}
        ${transformation.e1[0]} & ${transformation.e2[0]}\\
        ${transformation.e1[1]} & ${transformation.e2[1]}
      \end{bmatrix}
      `,

      // algebraic definition
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
    ];
  };

  /**
   * Creates a Tex string for the transformation algebraic definition expression
   * @param {number} num1 - e1's coeficient
   * @param {number} num2 - e2's coeficient
   * @param {Array} names - variable names ()
   * @returns
   */
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

  /**
   * Conditional rules to check for 1's or 0's on the definition
   * @param num
   * @param name
   * @returns
   */
  const validation = (num: number, name: string) => {
    if (num === 1) {
      return name;
    } else if (num === 0) {
      return "";
    } else {
      return `${num}${name}`;
    }
  };

  /**
   * Returns a vector object from a valid vector Tex string;
   * containing its coordinates and optionally its name;
   * @param {string} vectorStr - in the format "[name]_{[number]} = ([xcoordinate], [ycoordinate])"
   * @returns {Vector} New vector object
   */
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
