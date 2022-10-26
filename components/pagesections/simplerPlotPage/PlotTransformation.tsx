import { Tooltip } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Edit3, Plus, RotateCcw, Trash2 } from "react-feather";
import Transformation from "../../../classes/transformation";
import { useListContext, useNameContext } from "../../../context";
import useList from "../../../hooks/useList";
import useTexStr from "../../../hooks/useTexStr";
import RenderTex from "../../tex/RenderTex";
import TransformationForm from "../../ui/TransformationForm";
import {
  validateTransformationName,
  validateTransformationValues,
} from "../../../utils";
import { evaluate } from "mathjs";
import StateList from "../../../classes/stateList";
import { IPlotTransformation } from "../../../interfaces/interfaces";

const PlotTransformation: FunctionComponent<IPlotTransformation> = ({
  transformation,
  trnIndex,
}) => {
  const { matrixStrings } = useTexStr();
  const [currentTrnExpression, setCurrentTrnExpression] = useState(
    matrixStrings(trnIndex)[0]
  );
  const [currentPosition, setCurrentPosition] = useState(0);
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [toggleUpdateCreate, setToggleUpdateCreate] =
    useState<string>("create");
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();

  const { addTransformation, updateTransformation, removeTransformation } =
    useList();

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   */
  const transfromationSubmitHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${stateVecArr.vectorArr.length}}`;

    // validate submited data
    if (
      !validateTransformationName(name) ||
      !validateTransformationValues([
        event.target.t0.value,
        event.target.t2.value,
        event.target.t1.value,
        event.target.t3.value,
      ])
    ) {
      alert("transformação inválida");
      return;
    }
    const newHead = addTransformation(
      new Transformation(
        [evaluate(event.target.t0.value), evaluate(event.target.t2.value)],
        [evaluate(event.target.t1.value), evaluate(event.target.t3.value)],
        name
      ),
      transformation.name
    );
    const newList = new StateList(newHead);

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
    setToggleTrnInput(false);
  };

  /**
   * Updates the current transformation matrix and name
   */
  const transformationUpdateHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : transformation.name;

    // validate submited data
    if (
      !validateTransformationName(name) ||
      !validateTransformationValues([
        event.target.t0.value,
        event.target.t2.value,
        event.target.t1.value,
        event.target.t3.value,
      ])
    ) {
      alert("nome de transformação inválido");
      return;
    }

    const newHead = updateTransformation(
      new Transformation(
        [evaluate(event.target.t0.value), evaluate(event.target.t2.value)],
        [evaluate(event.target.t1.value), evaluate(event.target.t3.value)],
        name
      ),
      transformation.name
    );

    if (!newHead) {
      alert("erro ao encontrar a transformação");
      return;
    }
    const newList = new StateList(newHead);

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
  };

  /**
   * Deletes the current transformation
   * @param {string} transformationName
   */
  const transformationDeleteHandler = (transformationName: string) => {
    const newHead = removeTransformation(transformationName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
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
      <aside>
        {toggleUpdateCreate === "create" && (
          <>
            <RenderTex
              mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
              title="Transformação de R2 em R2"
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
      >
        <Tooltip title="Adicionar nova transformação">
          <Plus />
        </Tooltip>
      </button>
      <button
        disabled={trnIndex === 0}
        className="absolute bottom-1 right-1"
        onClick={() => transformationDeleteHandler(transformation.name)}
      >
        <Tooltip title="Excluir transformação">
          <Trash2 />
        </Tooltip>
      </button>
      <button className="absolute top-1 right-1" onClick={changeDefinition}>
        <Tooltip title="Excluir transformação">
          <RotateCcw />
        </Tooltip>
      </button>
      {toggleTrnInput && (
        <TransformationForm
          onSubmit={
            toggleUpdateCreate === "update"
              ? transformationUpdateHandler
              : transfromationSubmitHandler
          }
          updateOrCreate={toggleUpdateCreate}
          matrixArr={transformation.e1.concat(transformation.e2)}
        />
      )}
    </>
  );
};

export default PlotTransformation;
