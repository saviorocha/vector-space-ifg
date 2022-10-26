import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext } from "../context";

/**
 * Custom hook to manage operations on the current list object through the listContext;
 * Its methods returns a new head from which the list can be rebuilt
 */
const useList = () => {
  const { list } = useListContext();
  //   const [head, setHead] = useState(list.head)

  /**
   * Adds a new vector to the list
   * @param {Vector} newVector - vector to be added
   * @returns {StateNode}
   */
  const addVector = (newVector: Vector): StateNode => {
    let newHead = list.head;
    newHead.vectors.push(newVector);
    list.updateNodes();

    return newHead;
  };

  /**
   */
  const updateVector = (
    newVector: Vector,
    prevVectorName: string
  ): StateNode => {
    removeVector(prevVectorName);
    const newHead = addVector(newVector);
    return newHead;
    // console.log("vector: ", newHead.vectors.find(element => element.name === vectorName));
  };

  /**
   * Removes a given vector given its name
   * @param {string} vectorName - name of the vector being removed
   * @returns {StateNode}
   */
  const removeVector = (vectorName: string): StateNode => {
    const newHead = list.head;
    newHead.vectors = newHead.vectors.filter((vec) => {
      return vec.name !== vectorName;
    });
    list.updateNodes();
    return newHead;
  };

  /**
   * Adds a new transoformation to the list, before another transformation
   * @param {Transformation} transformation - transformation being added
   * @param {string} prevTransformationName - name of the transformation previous to the one being added
   * @returns {StateNode}
   */
  const addTransformation = (
    transformation: Transformation,
    prevTransformationName: string = list.getTail().transformation.name
  ): StateNode => {
    const previousState = getNodeByName(prevTransformationName);

    if (!previousState) {
      return list.head;
    }

    let newState = new StateNode(transformation, previousState);

    if (!previousState._next) {
      previousState._next = newState;
    } else {
      let nextState = previousState._next;

      newState._next = nextState;
      previousState._next = newState;
      nextState._previous = newState;

      while (nextState) {
        nextState.vectors = nextState.updateVectors();
        nextState = nextState._next!;
      }
    }

    return list.head;
  };

  /**
   * Updates a given transformation from the list given its name
   * @param {Transformation} newTransformation - new transformation object to update
   * @param {string} currentTransformationName - name of the transformation being updated
   * @returns {StateNode|null}
   */
  const updateTransformation = (
    newTransformation: Transformation,
    currentTransformationName: string
  ): StateNode | null => {
    const transformationState = getNodeByName(currentTransformationName);

    if (!transformationState) {
      return null;
    }
    transformationState.transformation = newTransformation;

    let nextState = transformationState;
    while (nextState) {
      nextState.vectors = nextState.updateVectors();
      nextState = nextState._next!;
    }

    return list.head;
  };

  /**
   * Removes a given transformation from the list given its name
   * @param {string} transformationName - name of the transformation being removed
   * @returns {StateNode}
   */
  const removeTransformation = (transformationName: string): StateNode => {
    const newHead = list.head;
    const nodeToRemove = getNodeByName(transformationName);

    let next: StateNode | null = nodeToRemove!._next;
    let previous: StateNode | null = nodeToRemove!._previous;

    if (next) next._previous = previous;
    if (previous) previous._next = next;
    list.updateNodes();
    return newHead;
  };

  /**
   * Finds the list node given a transformation name
   * @param {string} transformationName 
   * @returns {StateNode}
   */
  const getNodeByName = (transformationName: string): StateNode | null => {
    let currentState: StateNode | null = list.head;
    let transStateName = currentState.transformation.name;

    while (transStateName !== transformationName) {
      currentState = currentState._next;
      if (!currentState) {
        return null;
      }
      transStateName = currentState.transformation.name;
    }
    return currentState;
  };

  return {
    addVector,
    updateVector,
    removeVector,
    addTransformation,
    updateTransformation,
    removeTransformation,
  };
};

export default useList;
