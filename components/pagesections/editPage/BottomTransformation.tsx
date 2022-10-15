import { Tooltip } from "@mui/material";
import { evaluate } from "mathjs";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useListContext, useNameContext } from "../../../context";
import useList from "../../../hooks/useList";
import { IBottomTransformationProps } from "../../../interfaces/interfaces";
import { validateTransformationName } from "../../../utils";
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
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { currentPlot, setCurrentPlot } = useNameContext();

  const { addTransformation, updateTransformation, removeTransformation } =
    useList();
  const [transformation, setTransformation] = useState<Transformation>(
    stateVecArr.transformationArr[currentPlot]
  );

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   */
  const transfromationSubmitHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${stateVecArr.vectorArr.length}}`;

    // validate submited data
    if (!validateTransformationName(name)) {
      alert("nome de transformação inválido");
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
    if (!validateTransformationName(name)) {
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
    setCurrentPlot(currentPlot - 1); // changes the plot being rendered to avoid inconsistency
    setList(newList);
    setStateVecArr(list.toArray());
  };

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
        <Tooltip title="Editar matriz transformação">
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
        onClick={() => transformationDeleteHandler(transformation.name)}
      >
        <Tooltip title="Excluir transformação">
          <Trash2 />
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

export default BottomTransformation;
