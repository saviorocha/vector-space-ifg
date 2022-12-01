import { evaluate, isNumber, parse } from "mathjs";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext, useNameContext } from "../context";
import { useConfigContext } from "../context/ConfigContext";
import { validateVectorName, validateVectorValues } from "../utils";

/**
 * Custom hook with methods for operations with KaTeX strings
 */
const useTexStr = () => {
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();
  const { showMathSymbols, decimalPoint } = useConfigContext();
  const { vectorNameCounter, setVectorNameCounter, transformationVars } =
    useNameContext();

  /**
   * Returns a array with different string representations for a transformation
   * @param {number} transformationIndex - index of the transformation on the stateVecArr of the list context
   * @returns KaTeX string array
   */
  const matrixStrings = (transformationIndex?: number) => {
    // transformation object
    const transformation: Transformation =
      stateVecArr.transformationArr[transformationIndex || currentPlot];
    // definition variables
    const a = transformationVars[0];
    const b = transformationVars[1];
    // basis vectors
    const e1 = showMathSymbols
      ? [transformation.e1[0].texExpression, transformation.e1[1].texExpression]
      : [
          parseFloat(transformation.e1[0].value.toFixed(decimalPoint)),
          parseFloat(transformation.e1[1].value.toFixed(decimalPoint)),
        ];
    const e2 = showMathSymbols
      ? [transformation.e2[0].texExpression, transformation.e2[1].texExpression]
      : [
          parseFloat(transformation.e2[0].value.toFixed(decimalPoint)),
          parseFloat(transformation.e2[1].value.toFixed(decimalPoint)),
        ];

    return [
      // matrix representation
      String.raw`
        ${transformation.name}(${a}, ${b}) = \begin{bmatrix}
        ${e1[0]} & ${e2[0]}\\
        ${e1[1]} & ${e2[1]}
          \end{bmatrix}\begin{bmatrix}
            ${a}\\
            ${b}
          \end{bmatrix}
        `,
      // algebraic definition
      String.raw`${transformation.name}(${a}, ${b}) = 
            (${defString(e1[0], e2[0], transformationVars)}, 
             ${defString(e1[1], e2[1], transformationVars)})`
        .trim()
        .replace(/\n/g, ""),
    ];
  };

  /**
   * Creates a Tex string for the transformation algebraic definition expression
   * @param {number} num1 - e1's coeficient
   * @param {number} num2 - e2's coeficient
   * @param {Array} names - variable names
   * @returns
   */
  const defString = (
    num1: number | string,
    num2: number | string,
    names: [string, string]
  ): string => {
    if (num1 == "0" && num2 == "0") {
      return "0";
    }

    return `${validation(num1, names[0])} ${
      num1 == "0" || num2 == "0" ? "" : "+"
    } ${validation(num2, names[1])}`;
  };

  /**
   * Conditional rules to check for 1's or 0's on the definition
   * @param num
   * @param name
   * @returns
   */
  const validation = (num: number | string, name: string) => {
    if (num == "1") {
      return name;
    } else if (num == "0") {
      return "";
    } else {
      return `${num} ${name}`;
    }
  };

  /**
   * Returns a Tex string with the multiplication of the vector times
   * the tranformation matrix
   * @param {Transformation} transformation
   * @param {Vector} vec
   * @returns {string}
   */
  const vectorMatrixMultiplication = (
    transformation: Transformation,
    vec: Vector
  ): string => {
    const multiplyX = showMathSymbols
      ? vec.prevVector?.xTex || vec.xTex
      : vec.prevVector?.x || vec.x;
    const multiplyY = showMathSymbols
      ? vec.prevVector?.yTex || vec.yTex
      : vec.prevVector?.y || vec.y;

    return String.raw`
      ${vec.name} = \begin{bmatrix}
          ${
            showMathSymbols
              ? transformation.e1[0].texExpression
              : transformation.e1[0].value
          } & ${
      showMathSymbols
        ? transformation.e2[0].texExpression
        : transformation.e2[0].value
    }\\
          ${
            showMathSymbols
              ? transformation.e1[1].texExpression
              : transformation.e1[1].value
          } & ${
      showMathSymbols
        ? transformation.e2[1].texExpression
        : transformation.e2[1].value
    }
        \end{bmatrix}\begin{bmatrix}
          ${multiplyX}\\
          ${multiplyY}
        \end{bmatrix} = \begin{bmatrix}
          (${
            showMathSymbols
              ? transformation.e1[0].texExpression
              : transformation.e1[0].value
          } \cdot ${multiplyX}) + (${
      showMathSymbols
        ? transformation.e2[0].texExpression
        : transformation.e2[0].value
    } \cdot ${multiplyY})\\
          (${
            showMathSymbols
              ? transformation.e1[1].texExpression
              : transformation.e1[1].value
          } \cdot ${multiplyX}) + (${
      showMathSymbols
        ? transformation.e2[1].texExpression
        : transformation.e2[1].value
    } \cdot ${multiplyY})
        \end{bmatrix} = \begin{bmatrix}
          ${showMathSymbols ? vec.xTex : vec.x}\\
          ${showMathSymbols ? vec.yTex : vec.y}\\
        \end{bmatrix}
    `;
  };

  /**
   * Returns a vector object from a valid vector Tex string;
   * containing its coordinates and optionally its name;
   * @param {string} vectorStr - in the format "[name]_{[number]} = ([xcoordinate], [ycoordinate])"
   * @returns {Vector} New vector object
   */
  const vectorFromTex = (vectorStr: string): Vector | undefined => {
    vectorStr = vectorStr.replace(/\s/g, ""); // removes white spaces

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
      return;
    }
    // gonna improve this later, sorry
    if (name === `v_{${vectorNameCounter}}`) {
      setVectorNameCounter(vectorNameCounter + 1);
    }
    return new Vector(
      [
        {
          value: evaluate(values[0]),
          texExpression: parse(values[0]).toTex(),
        },
        {
          value: evaluate(values[1]),
          texExpression: parse(values[1]).toTex(),
        },
      ],
      `${name}`
    );
  };
  return { matrixStrings, vectorFromTex, vectorMatrixMultiplication };
};

export default useTexStr;
