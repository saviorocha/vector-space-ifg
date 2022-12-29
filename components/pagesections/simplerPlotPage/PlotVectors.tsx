import { Tooltip } from "@mui/material";
import { useTheme } from "next-themes";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Plus } from "react-feather";
import toast from "react-hot-toast";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import { useConfigContext } from "../../../context/ConfigContext";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/ui/vectorbox.module.css";
import VectorTex from "../../tex/VectorTex";
import HoverableComponent from "../../ui/dataDisplay/HoverableComponent";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [vectorRender, setVectorRender] = useState<Vector[]>(vectors);
  const { showBasisVectors, showMathSymbols, decimalPoint } =
    useConfigContext();
  const { vectorSubmitHandler } = useListEvents();
  const { vectorMatrixMultiplication } = useTexStr();
  const { stateVecArr } = useListContext();
  const { theme } = useTheme();
  
  /**
   * Sorts the vectorRender state by the vector names (to avoid update bugs...)
   * @param vectorArr
   */
  const sortObjArr = (vectorArr: Vector[]) => {
    vectorArr.sort((a, b) => {
      let fa = a.name,
        fb = b.name;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  };

  const handleVectorInputSubmit = (value: any) => {
    const { successful, message } = vectorSubmitHandler(value);

    inputRef.current!.value = value;
    if (successful) {
      inputRef.current!.value = "";
    } else {
      toast(message!);
    }
  };

  const handleVectorBtnSubmit = () => {
    const { successful, message } = vectorSubmitHandler(
      inputRef.current!.value
    );
    if (successful) {
      inputRef.current!.value = "";
    } else {
      toast(message!);
    }
  };

  useEffect(() => {
    // console.log("hideAlert create", hideAlert);
    // console.log("focus", focus);
    // console.log("vectorRender", vectorRender);
  }, [vectorRender]);

  useEffect(() => {
    const newVectors = vectors.filter((vector: Vector) => {
      // filter basis vectors
      return showBasisVectors ? vector : !vector.isBasisVector;
    });
    sortObjArr(newVectors);
    setVectorRender(newVectors);
    // console.log("vectorRender", vectorRender);
  }, [showBasisVectors, vectors]);

  return (
    <div
      className="
        rounded-md w-11/12 h-36 text-sm shadow-md 
        flex flex-col items-center justify-between
        bg-white border border-gray-400
        dark:bg-zinc-900 dark:border-neutral-600
      "
    >
      <ul className="overflow-scroll" id={styles.vectorlist}>
        {vectorRender.map((vec: Vector, i: number) => {
          return (
            <li key={i}>
              {plotIndex !== 0 ? (
                <HoverableComponent
                  hoverTexExpression={vectorMatrixMultiplication(
                    stateVecArr.transformationArr[plotIndex],
                    vec
                  )}
                >
                  <VectorTex
                    expression={`${vec.name}=(
                     ${parseFloat(vec.x.toFixed(decimalPoint))},
                     ${parseFloat(vec.y.toFixed(decimalPoint))}
                    )`}
                    vector={vec}
                    currentPlot={plotIndex}
                  />
                </HoverableComponent>
              ) : (
                // don't hover on vectors of the first plot
                <VectorTex
                  expression={`${vec.name}=(${
                    showMathSymbols
                      ? vec.xTex
                      : parseFloat(vec.x.toFixed(decimalPoint))
                  },${
                    showMathSymbols
                      ? vec.yTex
                      : parseFloat(vec.y.toFixed(decimalPoint))
                  })`}
                  vector={vec}
                  currentPlot={plotIndex}
                />
              )}
            </li>
          );
        })}
      </ul>
      {plotIndex === 0 && (
        <footer id={styles.inputcontainer}>
          <input
            placeholder="Inserir vetor"
            ref={inputRef}
            onBlur={() => {
              setFocus(false);
            }}
            onFocus={() => {
              setFocus(true);
            }}
            className={styles.inpvec}
            style={{
              borderColor: theme === "dark" ? "#333333" : "#9a9a9a",
              color: theme === "dark" ? "#fff" : "#000",
              backgroundColor: focus
                ? theme === "dark"
                  ? "#1a1a1a"
                  : "#ececec"
                : "",
            }}
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                handleVectorInputSubmit(event.target.value);
              }
            }}
            //   value={input}
            //   onChange={(e) => onChangeInput(e)}
          />
          <Tooltip title="Adicionar um novo vetor">
            <button onClick={handleVectorBtnSubmit}>
              <Plus
                size={24}
                className={styles.btn}
                style={{
                  color: theme === "dark" ? "#f1f1f1" : "#373837",
                }}
              />
            </button>
          </Tooltip>
        </footer>
      )}
    </div>
  );
};

export default PlotVectors;
