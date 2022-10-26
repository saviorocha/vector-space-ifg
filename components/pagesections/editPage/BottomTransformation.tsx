import { Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "react-feather";
import Transformation from "../../../classes/transformation";
import { useListContext, useNameContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import { IBottomTransformationProps } from "../../../interfaces/interfaces";
import RenderTex from "../../tex/RenderTex";
import TransformationForm from "../../ui/TransformationForm";

/**
 * Component for showing on the bottom bar the current transformation being rendered
 */
const BottomTransformation: FunctionComponent<IBottomTransformationProps> = ({
  transformationExpression,
}) => {
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [toggleUpdateCreate, setToggleUpdateCreate] =
    useState<string>("create");
  const {
    transformationSubmitHandler,
    transformationUpdateHandler,
    transformationDeleteHandler,
  } = useListEvents();
  const { stateVecArr } = useListContext();
  const { currentPlot, setCurrentPlot } = useNameContext();

  const [transformation, setTransformation] = useState<Transformation>(
    stateVecArr.transformationArr[currentPlot]
  );

  const handleTransfromationSubmit = (event: any) => {
    transformationSubmitHandler(event, transformation);
    setToggleTrnInput(false);
  };

  const handleTransformationUpdate = (event: any) => {
    transformationUpdateHandler(event, transformation);
  };

  const handleTransformationDelete = () => {
    transformationDeleteHandler(transformation.name)
    setCurrentPlot(currentPlot - 1); // changes the plot being rendered to avoid inconsistency
  }

  useEffect(() => {
    // console.log("toggleTrnInput", toggleTrnInput);
    // console.log("toggleUpdateCreate", toggleUpdateCreate);
  }, [toggleTrnInput, toggleUpdateCreate]);

  useEffect(() => {
    // console.log("list", stateVecArr, list)
    setTransformation(stateVecArr.transformationArr[currentPlot]);
    setToggleTrnInput(false);
    setToggleUpdateCreate("create");
  }, [stateVecArr, currentPlot]);

  return (
    <>
      <div>
        {toggleUpdateCreate === "create" && (
          <>
            <RenderTex
              mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
              title="Transformação de R2 em R2"
            />
            <RenderTex
              mathExpression={transformationExpression}
              title="Matriz de transformação"
            />
          </>
        )}
      </div>
      <button
        className="absolute top-1 left-1"
        onClick={() => {
          setToggleTrnInput(!toggleTrnInput && currentPlot !== 0);
          setToggleUpdateCreate(
            toggleUpdateCreate === "update" ? "create" : "update"
          );
        }}
        disabled={currentPlot === 0}
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
      >
        <Tooltip title="Adicionar uma nova transformação">
          <Plus />
        </Tooltip>
      </button>
      <button
        disabled={currentPlot === 0}
        className="absolute bottom-1 right-1"
        onClick={handleTransformationDelete}
      >
        <Tooltip title="Excluir transformação">
          <Trash2 />
        </Tooltip>
      </button>

      {toggleTrnInput && (
        <TransformationForm
          onSubmit={
            toggleUpdateCreate === "update"
              ? handleTransformationUpdate
              : handleTransfromationSubmit
          }
          updateOrCreate={toggleUpdateCreate}
          matrixArr={transformation.e1.concat(transformation.e2)}
        />
      )}
    </>
  );
};

export default BottomTransformation;
