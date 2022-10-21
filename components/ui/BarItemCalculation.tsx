import React, { FunctionComponent } from "react";
import useTexStr from "../../hooks/useTexStr";
import { IBarItemCalculationProps } from "../../interfaces/interfaces";
import RenderTex from "../tex/RenderTex";

const BarItemCalculation: FunctionComponent<IBarItemCalculationProps> = ({
  transformation,
  vectors,
}) => {
  const { vectorMatrixMultiplication } = useTexStr();
  return (
    <li className="relative m-1 py-1">
      <div
        className="
          flex items-center flex-col text-sm py-4 px-6 h-60
          bg-gray-50 border border-gray-400 shadow-md 
          overflow-scroll whitespace-nowrap rounded-lg
          hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer
        "
      >
        <RenderTex
          mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
          title={`Transformação ${transformation.name}`}
        />
        <br />
        {vectors.map((vec, i) => {
          return (
            <React.Fragment key={i}>
              <RenderTex
                mathExpression={`${vec.name}=(${vec.x},${vec.y})`}
                title={vec.name}
              />
              <RenderTex
                mathExpression={vectorMatrixMultiplication(transformation, vec)}
                title={`Cálculo do vetor ${vec.name}`}
              />
            </React.Fragment>
          );
        })}
      </div>
    </li>
  );
};

export default BarItemCalculation;
