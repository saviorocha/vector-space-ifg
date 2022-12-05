import { Alert, Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit2, Trash2, X } from "react-feather";
import { useListContext } from "../../context";
import { useConfigContext } from "../../context/ConfigContext";
import useListEvents from "../../hooks/useListEvents";
import { IVectorTexProps } from "../../interfaces/interfaces";
import RenderTex from "./RenderTex";

/**
 * This component handles vector creation, update and deletion
 */
const VectorTex: FunctionComponent<IVectorTexProps> = ({
  expression,
  vector,
  currentPlot,
}) => {
  const [texExpression, setTexExpression] = useState(expression);
  const [mathExpression, setMathExpression] = useState(
    `${vector.name}=(${vector.xExp},${vector.yExp})`
  );
  const [showTex, setShowTex] = useState(true);
  const [hideAlert, setHideAlert] = useState(true);

  const { stateVecArr } = useListContext();
  const { vectorDeleteHandler, vectorUpdateHandler } = useListEvents();


  useEffect(() => {
    // console.log("vectorName", vectorName);
    // console.log("vectorExpression", vectorExpression);
    // console.log("expression", expression);
    // console.log("alert update", hideAlert);
    // console.log("mathExpression", mathExpression);
    // console.log("texExpression", texExpression)
    // console.log("stateVecArr", stateVecArr);
    // console.log(vector.name, vector);
  }, [texExpression, mathExpression, hideAlert, stateVecArr]);

  useEffect(() => {
    setTexExpression(expression);
    // console.log("vectorExpression", vectorExpression);
  }, [expression]);

  const handleOnChange = (event: any) => {
    if (event.target.value) {
      setTexExpression(event.target.value);
      setMathExpression(event.target.value);
    }
  };

  const handleVectorUpdate = (event: any) => {
    const updated = vectorUpdateHandler(mathExpression, event);

    setHideAlert(updated);
    if (updated) {
      setShowTex(true);
    }
    if (event.target.value) {
      // checks for empty strings
      setTexExpression(event.target.value);
      setMathExpression(event.target.value);
    }
  };

  const handleDoubleClick = (event: any) => {
    if (event.detail === 2) {
      setShowTex(false);
    }
  };

  const handleEditBtn = () => {
    setShowTex(!showTex);
  };

  return (
    <div className="flex">
      {!vector.name.includes("e_{1}") &&
      !vector.name.includes("e_{2}") &&
      currentPlot === 0 ? (
        <>
          <button
            onClick={() => vectorDeleteHandler(vector.name)}
            className="ml-1"
          >
            <Trash2 size={19} />
          </button>
          <button onClick={handleEditBtn} className="ml-1">
            <Edit2 size={19} />
          </button>
        </>
      ) : null}
      {!vector.name.includes("e_{1}") &&
      !vector.name.includes("e_{2}") &&
      !showTex ? (
        <input
          className="border border-slate-400 w-24"
          onKeyDown={(event: any) => {
            if (event.key === "Enter") {
              handleVectorUpdate(event);
            }
          }}
          onChange={handleOnChange}
          value={mathExpression}
        />
      ) : (
        <RenderTex
          mathExpression={texExpression}
          handleDoubleClick={handleDoubleClick}
        />
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

export default VectorTex;
