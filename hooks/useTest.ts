import { useState } from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext } from "../context";

const useTest = (
  vectorArr?: Vector[],
  transformationArr?: Transformation[][]
) => {
  const { list } = useListContext();
  const [head, setHead] = useState(list.head);
  const [vectors, setVectors] = useState<Vector[]>(head.vectors);
  const [transformations, setTransformations] = useState<Transformation[][]>([]);
  const newHead = head;

  if (vectorArr) {
    newHead?.vectors.push(...vectorArr);
  }

  if (transformationArr) {

  }
  let newstate = stateList.head;
  for (let i = 0; i < statesNum; i++) {
    newstate._next = new StateNode(statesNum[i], newstate);
    newstate = newstate._next;
  }
  let newList = new StateList(stateList.head);

  return newList;
//   updateNodes(list, transformations.length);
  //   console.log(list);
};
const updateNodes = (stateList: StateList, statesNum: number) => {
  let newstate = stateList.head;
  for (let i = 0; i < statesNum; i++) {
    newstate._next = new StateNode(statesNum[i], newstate);
    newstate = newstate._next;
  }
  let newList = new StateList(stateList.head);

  return newList;
};

export default useTest;
