import { Alert, Button, Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Plus, X } from "react-feather";
import Vector from "../../../classes/vector";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotVectorsProps } from "../../../interfaces/interfaces";
import VectorTex from "../../tex/VectorTex";
import HoverableComponent from "../../ui/dataDisplay/HoverableComponent";
import styles from "../../../styles/modules/ui/vectorbox.module.css";
import { useConfigContext } from "../../../context/ConfigContext";

const PlotVectors: FunctionComponent<IPlotVectorsProps> = ({
  vectors,
  plotIndex,
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [vectorRender, setVectorRender] = useState(vectors);
  const [hideAlert, setHideAlert] = useState(true);
  const { showBasisVectors, showMathSymbols, decimalPoint } =
    useConfigContext();
  const { vectorSubmitHandler } = useListEvents();
  const { vectorMatrixMultiplication } = useTexStr();
  const { stateVecArr } = useListContext();

  const handleVectorInputSubmit = (value: any) => {
    const created = vectorSubmitHandler(value);
    setHideAlert(created);
    inputRef.current!.value = value;
  };

  const handleVectorBtnSubmit = () => {
    const created = vectorSubmitHandler(inputRef.current!.value);
    setHideAlert(created);
    if (created) {  
      inputRef.current!.value = "";
    }
  };

  useEffect(() => {
    // console.log("hideAlert create", hideAlert);
  }, [hideAlert]);

  useEffect(() => {
    setVectorRender(
      vectors.filter((vector: Vector) => {
        // filter basis vectors
        return showBasisVectors ? vector : !vector.isBasisVector;
      })
    );
  }, [showBasisVectors, vectors]);

  return (
    <div
      className="
        rounded-md w-11/12 h-36
        flex flex-col items-center justify-between
        bg-white border border-gray-400
        text-sm shadow-md dark:bg-zinc-900 dark:border-neutral-600
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
                    vectorExpression={`${vec.name}=(${parseFloat(
                      vec.x.toFixed(decimalPoint)
                    )},${parseFloat(vec.y.toFixed(decimalPoint))})`}
                    vectorName={vec.name}
                    currentPlot={plotIndex}
                  />
                </HoverableComponent>
              ) : (
                // don't hover on vectors of the first plot
                <VectorTex
                  vectorExpression={`${vec.name}=(${
                    showMathSymbols
                      ? vec.xTex
                      : parseFloat(vec.x.toFixed(decimalPoint))
                  },${
                    showMathSymbols
                      ? vec.yTex
                      : parseFloat(vec.y.toFixed(decimalPoint))
                  })`}
                  vectorName={vec.name}
                  currentPlot={plotIndex}
                />
              )}
            </li>
          );
        })}
      </ul>
      {plotIndex === 0 && (
        <footer className={styles.inputcontainer}>
          <input
            placeholder="Inserir vetor"
            ref={inputRef}
            className={styles.inpvec}
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
              <Plus size={24} className={styles.btn} />
            </button>
          </Tooltip>
        </footer>
      )}
      {!hideAlert && (
        <Alert
          severity="error"
          className="absolute mx-0 top-0"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setHideAlert(true);
              }}
            >
              <X />
            </Button>
          }
        >
          Expressão inválida! Tente novamente.
        </Alert>
      )}
    </div>
  );
};

export default PlotVectors;
