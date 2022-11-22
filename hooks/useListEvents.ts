import { evaluate, parse } from "mathjs";
import StateList from "../classes/stateList";
import Transformation from "../classes/transformation";
import { useListContext, useNameContext } from "../context";
import { useConfigContext } from "../context/ConfigContext";
import {
  validateTransformationName,
  validateTransformationValues,
} from "../utils";
import useList from "./useList";
import useTexStr from "./useTexStr";

const useListEvents = () => {
  const { vectorFromTex } = useTexStr();
  const { addVector, removeVector, updateVector } = useList();
  const { list, setList, setStateVecArr } = useListContext();
  const { decimalPoint } = useConfigContext();
  const { transformationNameCounter, setTransformationNameCounter } =
    useNameContext();
  const { addTransformation, updateTransformation, removeTransformation } =
    useList();

  /**
   * Adds a new vector to the list
   */
  const vectorSubmitHandler = (vectorStr: string): boolean => {
    const newVector = vectorFromTex(vectorStr);

    if (!newVector) {
      return false;
    }
    const newHead = addVector(newVector);
    const newList = new StateList(newHead);

    // updates list
    setList(newList);
    setStateVecArr(newList.toArray());
    return true;
  };

  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  const vectorUpdateHandler = (vectorExpression: string, event: any): boolean => {
    const newVector = vectorFromTex(event.target.value);
    const prevVectorName = vectorFromTex(vectorExpression)?.name;
    if (!newVector || !prevVectorName) {
      return false;
    }
    const newHead = updateVector(newVector, prevVectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(newList.toArray());

    event.target.value = "";
    return true;
  };

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   */
  const transformationSubmitHandler = (
    event: any,
    transformation: Transformation
  ): boolean => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${transformationNameCounter}}`;

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
      return false;
    }
    
    const newHead = addTransformation(
      new Transformation(
        [
          {
            value: parseFloat(
              evaluate(event.target.t0.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t0.value).toTex(),
          },
          {
            value: parseFloat(
              evaluate(event.target.t2.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t2.value).toTex(),
          },
        ],
        [
          {
            value: parseFloat(
              evaluate(event.target.t1.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t1.value).toTex(),
          },
          {
            value: parseFloat(
              evaluate(event.target.t3.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t3.value).toTex(),
          },
        ],
        name
      ),
      transformation.name
    );
    const newList = new StateList(newHead);

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
    setTransformationNameCounter(() => transformationNameCounter + 1);
    return true;
  };

  /**
   * Updates the current transformation matrix and name
   */
  const transformationUpdateHandler = (
    event: any,
    transformation: Transformation
  ): boolean => {
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
      return false;
    }

    const newHead = updateTransformation(
      new Transformation(
        [
          {
            value: parseFloat(
              evaluate(event.target.t0.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t0.value).toTex(),
          },
          {
            value: parseFloat(
              evaluate(event.target.t2.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t2.value).toTex(),
          },
        ],
        [
          {
            value: parseFloat(
              evaluate(event.target.t1.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t1.value).toTex(),
          },
          {
            value: parseFloat(
              evaluate(event.target.t3.value).toFixed(decimalPoint)
            ),
            texExpression: parse(event.target.t3.value).toTex(),
          },
        ],
        name
      ),
      transformation.name
    );

    if (!newHead) {
      return false;
    }
    const newList = new StateList(newHead);

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
    return true;
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
