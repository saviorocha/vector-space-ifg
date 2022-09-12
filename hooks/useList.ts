import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext } from "../context";

const useList = () => {
  const { list, setList } = useListContext();
  //   const [head, setHead] = useState(list.head)

  const addVector = (vector: Vector): StateNode => {
    let newHead = list.head;
    newHead.vectors.push(vector);
    list.updateNodes()

    return newHead;
  };

  const addTransformation = (
    transformation: Transformation,
    previousTransformationName: string = list.getTail().transformation.name
  ): StateNode => {
    
    const previousState = getStateByName(previousTransformationName);

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
    }
    return list.head;
  };

  const removeVector = (vectorName: string): StateNode => {
    const newHead = list.head;
    newHead.vectors = newHead.vectors.filter((vec) => {
      return vec.name !== vectorName;
    });
    return newHead;
  };

  const removeTransformation = (transformationName: string): StateNode => {
    const newHead = list.head;
    const stateToRemove = getStateByName(transformationName);

    let next: StateNode | null = stateToRemove!._next;
    let previous: StateNode | null = stateToRemove!._previous;

    if (next) next._previous = previous;
    if (previous) previous._next = next;

    return newHead;
  };

  const getStateByName = (transformationName: string): StateNode | null => {
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
  return { addVector, addTransformation, removeVector, removeTransformation };
};

export default useList;
