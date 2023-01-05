import { Tooltip } from "@mui/material";
import { useTheme } from "next-themes";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit3, Plus, RotateCcw, Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { useListContext, useNameContext } from "../../../context";
import { useConfigContext } from "../../../context/ConfigContext";
import useListEvents from "../../../hooks/useListEvents";
import useTexStr from "../../../hooks/useTexStr";
import { IPlotTransformation } from "../../../interfaces/interfaces";
import RenderTex from "../../tex/RenderTex";
import InfoBox from "../../ui/dataDisplay/InfoBox";
import TransformationForm from "../../ui/inputs/TransformationForm";

const PlotTransformation: FunctionComponent<IPlotTransformation> = ({
  transformation,
  trnIndex,
}) => {
  const { matrixStrings } = useTexStr();
  const { theme } = useTheme();
  const [currentTrnExpression, setCurrentTrnExpression] = useState(
    matrixStrings(trnIndex)[0]
  );
  const [currentPosition, setCurrentPosition] = useState(0);
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [toggleUpdateCreate, setToggleUpdateCreate] =
    useState<string>("create");
  const { stateVecArr } = useListContext();
  const {
    transformationSubmitHandler,
    transformationUpdateHandler,
    transformationDeleteHandler,
  } = useListEvents();
  const { transformationNameArr } = useNameContext();
  const { showMathSymbols, decimalPoint } = useConfigContext();

  const handleTransfromationSubmit = (event: any) => {
    const { successful, message } = transformationSubmitHandler(
      event,
      transformation
    );

    if (!successful) {
      toast(message!);
    }

    setToggleTrnInput(false);
  };

  const handleTransformationUpdate = (event: any) => {
    const { successful, message } = transformationUpdateHandler(
      event,
      transformation
    );
    if (!successful) {
      toast(message!);
    }
  };

  const handleTransformationDelete = () => {
    transformationDeleteHandler(transformation.name);
  };

  const changeDefinition = (event: any) => {
    event.preventDefault();
    const trnNameArr = matrixStrings(trnIndex);
    setCurrentPosition(
      currentPosition === trnNameArr.length - 1 ? 0 : currentPosition + 1 // "loop" validation
    );
    setCurrentTrnExpression(trnNameArr[currentPosition]);
  };

  useEffect(() => {
    // console.log("list", stateVecArr)
    // console.log("exp", currentTrnExpression)
    // console.log("transformationNameArr", transformationNameArr);
    setToggleTrnInput(false);
    setToggleUpdateCreate("create");
  }, [stateVecArr]);

  useEffect(() => {
    setCurrentTrnExpression(matrixStrings(trnIndex)[currentPosition]);
    // eslint-disable-next-line
  }, [showMathSymbols, decimalPoint, currentPosition]);

  return (
    <>
      <InfoBox customStyles="w-64 h-32">
        <aside>
          {toggleUpdateCreate === "create" && (
            <>
              <RenderTex
                mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
                title="Transformação de R² em R²"
              />
              <RenderTex
                mathExpression={currentTrnExpression}
                title="Matriz de transformação"
              />
            </>
          )}
        </aside>
        <button
          className="absolute top-1 left-1"
          onClick={() => {
            setToggleTrnInput(!toggleTrnInput && trnIndex !== 0);
            setToggleUpdateCreate(
              toggleUpdateCreate === "update" ? "create" : "update"
            );
          }}
          disabled={trnIndex === 0}
        >
          <Tooltip title="Editar matriz da transformação">
            <Edit3 />
          </Tooltip>
        </button>
        <button
          className="absolute bottom-1 left-1"
          onClick={() => {
            setToggleTrnInput(!toggleTrnInput);
            setToggleUpdateCreate("create");
          }}
          disabled={stateVecArr.transformationArr.length > 2}
        >
          <Tooltip title="Adicionar Transformação Linear">
            <Plus
              color={
                stateVecArr.transformationArr.length > 2
                  ? "#7f7f7f"
                  : theme === "dark"
                  ? "#fff"
                  : "#000"
              }
            />
          </Tooltip>
        </button>
        <button
          disabled={trnIndex === 0}
          className="absolute bottom-1 right-1"
          onClick={handleTransformationDelete}
        >
          <Tooltip title="Excluir transformação">
            <Trash2 />
          </Tooltip>
        </button>
        <button className="absolute top-1 right-1" onClick={changeDefinition}>
          <Tooltip title="Trocar definição">
            <RotateCcw />
          </Tooltip>
        </button>
        {toggleTrnInput && (
          <TransformationForm
            onSubmit={
              toggleUpdateCreate === "update"
                ? handleTransformationUpdate
                : handleTransfromationSubmit
            }
            matrixArr={transformation.e1
              .map((e1Vec, i) => {
                return showMathSymbols ? e1Vec.mathExpression : e1Vec.value;
              })
              .concat(
                transformation.e2.map((e2Vec, i) => {
                  return showMathSymbols ? e2Vec.mathExpression : e2Vec.value;
                })
              )}
          />
        )}
      </InfoBox>
    </>
  );
};

export default PlotTransformation;
