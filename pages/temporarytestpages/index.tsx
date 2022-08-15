import type { NextPage } from "next";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import Vector from "../../classes/vector";
import Transformation from "../../classes/transformation";
import StateNode from "../../classes/stateNode";
import StateList from "../../classes/stateList";
import { ListContextProvider, useListContext } from "../../context";
import TesteGrafico from "./testegrafico";

const Home: NextPage = () => {
  const [vector1, setVector1] = useState(() => new Vector([1, 1]));
  // const [vector2, setVector2] = useState(() => new Vector([2, 2]));
  // const [vector3, setVector3] = useState(() => new Vector([3, 3]));
  // const [vector4, setVector4] = useState(() => new Vector([4, 4]));

  const [transformation, setTransformation] = useState(
    () => new Transformation([1, 1], [1, 1])
  );

  const [state1, setState1] = useState(() => new StateNode());
  const [state2, setState2] = useState(() => new StateNode(transformation));
  // const [state3, setState3] = useState(
  //   new StateNode(transformation)
  // );
  // const [state4, setState4] = useState(
  //   new StateNode(transformation)
  // );

  const { list, setList } = useListContext();

  useEffect(() => {
    // console.log("list; useeffect", list);
    // console.log("state1; useeffect", state1);
    // // setState1(state2);
    // state1 = state2;
    // console.log("state1; useeffect", state1);
    // console.log("state2; useeffect", state2);
    // console.log(list);
    
    // if (list.head) {
    //   state1.vectors = [vector1];

    //   let newstate = state1;
    //   for (let i = 0; i < 2; i++) {
    //     newstate._next = new StateNode(transformation, newstate);
    //     newstate = newstate._next;
    //   }
    //   list.head = state1;
    // }
    
    // const stateJson = JSON.parse(JSON.stringify(new StateNode(transformation)));
    // list.insertTail(new StateNode(transformation, state1._next._next));
    // prettier-ignore
    // if (list.getAt(0))  { list.getAt(0)._next = state1; }
    // prettier-ignore
    // const node = list.getAt(1);
    // if (node) { node._next = new StateNode([vector4], transformation); }
  }, []);

  function handleOnClick() {
    // if (list.head) {
    //   state1.vectors = [vector1];

    //   let newstate = state1;
    //   for (let i = 0; i < 2; i++) {
    //     newstate._next = new StateNode(transformation, newstate);
    //     newstate = newstate._next;
    //   }
    //   list.head = state1;
    // }
    // console.log("list; onclick", list);
  }
  return (
    <>
  
      <div>olá</div>
      <button onClick={handleOnClick}>mudar state</button>
      {/* <TestContextComponent /> */}
    </>
  );
};

export default Home;
