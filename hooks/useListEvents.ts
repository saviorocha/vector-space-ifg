import { evaluate, parse } from "mathjs";
import StateList from "../classes/stateList";
import Transformation from "../classes/transformation";
import { useListContext, useNameContext } from "../context";
import {
  validateTransformationName,
  validateTransformationValues,
} from "../utils";
import useList from "./useList";
import useTexStr from "./useTexStr";

/**
 * Custom hook for providing handlers for list opertions
 */
const useListEvents = () => {
  const { vectorFromTex } = useTexStr();
  const { addVector, removeVector, updateVector } = useList();
  const { list, setList, setStateVecArr } = useListContext();
  const {
    transformationNameCounter,
    setTransformationNameCounter,
    transformationNameArr,
    setTransformationNameArr,
  } = useNameContext();
  const { addTransformation, updateTransformation, removeTransformation } =
    useList();

  /**
   * Adds a new vector to the list
   * @param {string} vectorStr
   * @returns {boolean}
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

  /**
   * Deletes a vector from the list
   * @param {string} vectorName
   */
  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  /**
   * Updates a vector
   * @param {string} vectorExpression
   * @param event
   * @returns {boolean}
   */
  const vectorUpdateHandler = (
    vectorExpression: string,
    event: any
  ): boolean => {
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
   * @param event
   * @param {Transformation} transformation
   * @returns {boolean}
   */
  const transformationSubmitHandler = (
    event: any,
    transformation: Transformation
  ): SubmissionFormat => {
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
      return {
        successful: false,
        message: "Valores inválidos! Tente novamente.",
      };
    }

    if (transformationNameArr.includes(name)) {
      return {
        successful: false,
        message: "Já existe uma transformação com este nome!",
      };
    }

    const newHead = addTransformation(
      new Transformation(
        [
          {
            value: evaluate(event.target.t0.value),
            texExpression: parse(event.target.t0.value).toTex(),
            mathExpression: event.target.t0.value,
          },
          {
            value: evaluate(event.target.t2.value),
            texExpression: parse(event.target.t2.value).toTex(),
            mathExpression: event.target.t2.value,
          },
        ],
        [
          {
            value: evaluate(event.target.t1.value),
            texExpression: parse(event.target.t1.value).toTex(),
            mathExpression: event.target.t1.value,
          },
          {
            value: evaluate(event.target.t3.value),
            texExpression: parse(event.target.t3.value).toTex(),
            mathExpression: event.target.t3.value,
          },
        ],
        name
      ),
      transformation.name
    );
    const newList = new StateList(newHead);
    const trnNameArr = transformationNameArr;
    trnNameArr.push(name);

    // updates context values
    setList(newList);
    setStateVecArr(list.toArray());
    setTransformationNameCounter(() => transformationNameCounter + 1);
    setTransformationNameArr(trnNameArr);

    return { successful: true };
  };

  /**
   * Updates the current transformation matrix and name
   * @param event
   * @param {Transformation} transformation
   * @returns {boolean}
   */
  const transformationUpdateHandler = (
    event: any,
    transformation: Transformation
  ): SubmissionFormat => {
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
      return {
        successful: false,
        message: "Valores inválidos! Tente novamente.",
      };
    }

    if (transformationNameArr.includes(name) && name !== transformation.name) {
      return {
        successful: false,
        message: "Já existe uma transformação com este nome!",
      };
    }

    const newHead = updateTransformation(
      new Transformation(
        [
          {
            value: evaluate(event.target.t0.value),
            texExpression: parse(event.target.t0.value).toTex(),
            mathExpression: event.target.t0.value,
          },
          {
            value: evaluate(event.target.t2.value),
            texExpression: parse(event.target.t2.value).toTex(),
            mathExpression: event.target.t2.value,
          },
        ],
        [
          {
            value: evaluate(event.target.t1.value),
            texExpression: parse(event.target.t1.value).toTex(),
            mathExpression: event.target.t1.value,
          },
          {
            value: evaluate(event.target.t3.value),
            texExpression: parse(event.target.t3.value).toTex(),
            mathExpression: event.target.t3.value,
          },
        ],
        name
      ),
      transformation.name
    );

    if (!newHead) {
      return {
        successful: false,
        message:
          "Não foi possível criar a transformação! Tente novamente mais tarde.",
      };
    }
    const newList = new StateList(newHead);
    const trnNameArr = transformationNameArr;
    trnNameArr[trnNameArr.indexOf(transformation.name)] = name;

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
    setTransformationNameArr(trnNameArr);
    return { successful: true };
  };

  /**
   * Deletes the current transformation
   * @param {string} transformationName
   */
  const transformationDeleteHandler = (transformationName: string) => {
    const newHead = removeTransformation(transformationName);
    const newList = new StateList(newHead);
    const trnNameArr = transformationNameArr.filter(
      (trnName) => trnName !== transformationName
    );

    setList(newList);
    setStateVecArr(list.toArray());
    setTransformationNameArr(trnNameArr);
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
