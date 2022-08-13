import React, { useEffect, useState } from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { useListContext } from "../context";
import useList from "../hooks/useList";

const TesteHook = () => {
  const { addVector, removeVector, addTransformation, removeTransformation } =
    useList();
  const { list, setList } = useListContext();
  const [secondNode, setsecondNode] = useState(
    new StateNode(new Transformation([1, 1], [1, 1], "T2"), list.head)
  );
  useEffect(() => {
    // let newHead = new StateNode(undefined, null);
    // let thirdNode = new StateNode(new Transformation([3, 3], [3, 3], "T3"));

    // newHead._next = secondNode;
    // secondNode._next = thirdNode;

    // setList(new StateList(newHead));
    // setList(addVector(new Vector([2, 2], "v3")));
    // setList(
    //   addTransformation(new Transformation([2, 2], [2, 2], "T4"), secondNode)
    // );
    // console.log("list b4", list);
    // console.log("removeTransformation", removeTransformation("T2"));
    // console.log("list after", list);
    // console.log("new list", newList);

    // removeVector("v1");
    // console.log("secondNode", secondNode);
    // console.log("newHead", newHead);
  }, []);

  useEffect(() => {
    console.log("current list", list);
  }, [list]);

  function handleResetList(event: any) {
    event.preventDefault();

    // let newHead = new StateNode(undefined, null);
    // let thirdNode = new StateNode(new Transformation([3, 3], [3, 3], "T3"));

    // newHead._next = secondNode;
    // secondNode._next = thirdNode;

    // const newList = new StateList(newHead);
    setList(new StateList(new StateNode(undefined, null)));
  }

  return (
    <>
      <button
        onClick={() => {
          console.log(list);
        }}
      >
        print list
      </button>
      <button onClick={handleResetList}>reset list</button>
      <br />
      <button
        onClick={() => {
          setList(addVector(new Vector([2, 2], "v3")));
          console.log("add vector", list);
        }}
      >
        add vector
      </button>
      <button
        onClick={() => {
          setList(
            addTransformation(
              new Transformation([2, 2], [2, 2], "T2"),
              "T"
            )
          );
          console.log("add transformation", list);
        }}
      >
        add transformation
      </button>
      <button
        onClick={() => {
          setList(removeVector("v3"));
          console.log("remove vector", list);
        }}
      >
        remove vector
      </button>
      <button
        onClick={() => {
          setList(removeTransformation("T2"));
          // removeTransformation("T2");
          console.log("remove transformation", list);
        }}
      >
        remove transformation
      </button>
    </>
  );
};

export default TesteHook;
