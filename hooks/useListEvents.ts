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
    vectorNameArr,
    setVectorNameArr,
    transformationNameArr,
    setTransformationNameArr,
  } = useNameContext();
  const { addTransformation, updateTransformation, removeTransformation } =
    useList();

  /**
   * Adds a new vector to the list
   * @param {string} vectorStr
   * @returns {SubmissionFormat}
   */
  const vectorSubmitHandler = (vectorStr: string): SubmissionFormat => {
    const vectorRes = vectorFromTex(vectorStr);

    if (!vectorRes.successful) {
      return vectorRes;
    }

    const newHead = addVector(vectorRes.data);
    const newList = new StateList(newHead);
    const vecNameArr = vectorNameArr;
    vecNameArr.push(vectorRes.data.name);

    // updates the list context
    setList(newList);
    setStateVecArr(newList.toArray());
    setVectorNameArr(vecNameArr);
    return vectorRes;
  };

  /**
   * Updates a vector
   * @param {string} vectorExpression
   * @param event
   * @returns {SubmissionFormat}
   */
  const vectorUpdateHandler = (
    vectorExpression: string,
    vectorStr: string
  ): SubmissionFormat => {
    const prevVectorName = vectorExpression.split("=")[0];
    const vectorRes = vectorFromTex(vectorStr, prevVectorName);

    if (!prevVectorName) {
      return {
        successful: false,
        message: "Não foi possível criar o vetor. Tente novamente mais tarde.",
      };
    }

    if (!vectorRes.data) {
      return vectorRes;
    }

    const newHead = updateVector(vectorRes.data, prevVectorName);
    const newList = new StateList(newHead);
    const vecNameArr = vectorNameArr;
    vecNameArr[vecNameArr.indexOf(prevVectorName)] = vectorRes.data.name;

    setList(newList);
    setStateVecArr(newList.toArray());
    setVectorNameArr(vecNameArr);

    // event.target.value = "";
    return vectorRes;
  };

  /**
   * Deletes a vector from the list
   * @param {string} vectorName
   */
  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    const vecNameArr = vectorNameArr.filter(
      (vecName) => vecName !== vectorName
    );

    setList(newList);
    setStateVecArr(list.toArray());
    setVectorNameArr(vecNameArr);
  };

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   * @param event
   * @param {Transformation} transformation
   * @returns {SubmissionFormat}
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
        message: "Expressão inválida! Tente novamente.",
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
   * @returns {SubmissionFormat}
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
        message: "Expressão inválida! Tente novamente.",
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
