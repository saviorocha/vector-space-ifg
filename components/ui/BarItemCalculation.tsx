import { FunctionComponent } from "react";
import { IBarItemCalculationProps } from "../../interfaces/interfaces";
import RenderTex from "../tex/RenderTex";

const BarItemCalculation: FunctionComponent<IBarItemCalculationProps> = ({
  transformation,
  vectors,
}) => {
  return (
    <li className="relative m-1 py-1">
      <div
        className="
          flex items-center flex-col text-sm py-4 px-6 h-24
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
            <RenderTex
              key={i}
              mathExpression={`${vec.name}=(${vec.x},${vec.y})`}
              title={vec.name}
            />
          );
        })}
      </div>
    </li>
  );
};

export default BarItemCalculation;
