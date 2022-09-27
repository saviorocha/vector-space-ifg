import { evaluate } from "mathjs";
import React, { useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "react-feather";
import StateList from "../../classes/stateList";
import Transformation from "../../classes/transformation";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import { validateTransformationName } from "../../utils";
import RenderTex from "../tex/RenderTex";
import TransformationForm from "../ui/TransformationForm";

const BottomTransformation = () => {
  const [toggleTrnInput, setToggleTrnInput] = useState(false);
  const [toggleUpdateCreate, setToggleUpdateCreate] = useState("create");
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { currentPlot, setCurrentPlot } = useNameContext();

  const { addTransformation, updateTransformation, removeTransformation } =
    useList();
  const [transformation, setTransformation] = useState<Transformation>(
    stateVecArr.transformationArr[currentPlot]
  );

  const transfromationSubmitHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${stateVecArr.vectorArr.length}}`;

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
    setList(newList);
    setStateVecArr(list.toArray());
    setToggleTrnInput(false);
  };

  const transformationUpdateHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : transformation.name;

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
    setList(newList);
    setStateVecArr(list.toArray());
  };

  const transformationDeleteHandler = (transformationName: string) => {
    const newHead = removeTransformation(transformationName);
    const newList = new StateList(newHead);
    setCurrentPlot(currentPlot - 1);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  useEffect(() => {
    // console.log("list", stateVecArr, list)
    setTransformation(stateVecArr.transformationArr[currentPlot]);
  }, [stateVecArr, currentPlot]);

  return (
    <>
      <div>
        {toggleUpdateCreate === "create" ? (
          <>
            <RenderTex
              mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
              title="Transformação de R2 em R2"
              handleDoubleClick={undefined}
            />
            <RenderTex
              mathExpression={String.raw`
            ${transformation.name}(a,b) = \begin{bmatrix}
            ${transformation.e1[0]} & ${transformation.e2[0]}\\
            ${transformation.e1[1]} & ${transformation.e2[1]}
              \end{bmatrix}\begin{bmatrix}
                a\\
                b
              \end{bmatrix}
            `}
              title="Matriz de transformação"
              handleDoubleClick={undefined}
            />
          </>
        ) : null}
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
        <Edit3 />
      </button>
      <button
        className="absolute bottom-1 left-1"
        onClick={() => {
          setToggleTrnInput(!toggleTrnInput);
          setToggleUpdateCreate("create");
        }}
      >
        <Plus />
      </button>

      <button
        disabled={currentPlot === 0}
        className="absolute bottom-1 right-1"
        onClick={() => transformationDeleteHandler(transformation.name)}
      >
        <Trash2 />
      </button>
      {toggleTrnInput ? (
        <TransformationForm
          onSubmit={
            toggleUpdateCreate === "update"
              ? transformationUpdateHandler
              : transfromationSubmitHandler
          }
          updateOrCreate={toggleUpdateCreate}
          matrixArr={transformation.e1.concat(transformation.e2)}
        />
      ) : null}
    </>
  );
};

export default BottomTransformation;
