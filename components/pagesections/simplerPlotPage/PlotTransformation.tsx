import { Alert, Button, Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit3, Plus, RotateCcw, Trash2, X } from "react-feather";
import { useListContext } from "../../../context";
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
  const [currentTrnExpression, setCurrentTrnExpression] = useState(
    matrixStrings(trnIndex)[0]
  );
  const [hideAlert, setHideAlert] = useState(true);
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

  const handleTransfromationSubmit = (event: any) => {
    const created = transformationSubmitHandler(event, transformation);
    setHideAlert(created);
    setToggleTrnInput(false);
  };

  const handleTransformationUpdate = (event: any) => {
    const updated = transformationUpdateHandler(event, transformation);
    setHideAlert(updated);
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
    // console.log("list", stateVecArr, list)
    setToggleTrnInput(false);
    setToggleUpdateCreate("create");
  }, [stateVecArr]);

  return (
    <>
      <InfoBox customStyles="w-60 h-32">
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
            <Plus />
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
                return e1Vec.value;
              })
              .concat(
                transformation.e2.map((e2Vec, i) => {
                  return e2Vec.value;
                })
              )}
          />
        )}
      </InfoBox>
      {!hideAlert && (
        <Alert
          severity="error"
          className="absolute mx-0 top-0 z-50"
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
          Valores inválidos! Tente novamente.
        </Alert>
      )}
    </>
  );
};

export default PlotTransformation;
