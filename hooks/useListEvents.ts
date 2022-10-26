import { evaluate } from "mathjs";
import StateList from "../classes/stateList";
import Transformation from "../classes/transformation";
import { useListContext } from "../context";
import {
  validateTransformationName,
  validateTransformationValues
} from "../utils";
import useList from "./useList";
import useTexStr from "./useTexStr";

const useListEvents = () => {
  const { vectorFromTex } = useTexStr();
  const { addVector, removeVector, updateVector } = useList();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addTransformation, updateTransformation, removeTransformation } =
    useList();

  /**
   * Adds a new vector to the list
   */
  const vectorSubmitHandler = (event: any) => {
    if (event.key === "Enter") {
      // triggered by enter key
      const newVector = vectorFromTex(event.target.value);

      if (!newVector) {
        alert("nome ou valores do vetor inválidos");
        return;
      }
      const newHead = addVector(newVector);
      const newList = new StateList(newHead);

      // updates list
      setList(newList);
      setStateVecArr(newList.toArray());

      event.target.value = "";
    }
  };

  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  const vectorUpdateHandler = (vectorExpression: string, event: any) => {
    const newVector = vectorFromTex(event.target.value);
    const prevVectorName = vectorFromTex(vectorExpression)?.name;
    if (!newVector || !prevVectorName) {
      alert("invalid");
      return;
    }
    const newHead = updateVector(newVector, prevVectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(newList.toArray());

    event.target.value = "";
  };

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   */
  const transformationSubmitHandler = (
    event: any,
    transformation: Transformation
  ) => {
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
  };

  /**
   * Updates the current transformation matrix and name
   */
  const transformationUpdateHandler = (
    event: any,
    transformation: Transformation
  ) => {
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
  return {
    vectorSubmitHandler,
    vectorDeleteHandler,
    vectorUpdateHandler,
    transformationSubmitHandler,
    transformationUpdateHandler,
    transformationDeleteHandler,
  };
};

export default useListEvents;
