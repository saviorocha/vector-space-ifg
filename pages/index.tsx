import type { NextPage } from "next";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import Vector from "../classes/vector";
import Transformation from "../classes/transformation";
import StateNode from "../classes/stateNode";
import StateList from "../classes/stateList";
import TestContextComponent from "../components/testecontext";
import { useListContext } from "../context";

const Home: NextPage = () => {
  const [vector1, setVector1] = useState(new Vector([1, 1]));
  const [vector2, setVector2] = useState(new Vector([2, 2]));
  const [vector3, setVector3] = useState(new Vector([3, 3]));
  const [vector4, setVector4] = useState(new Vector([4, 4]));
  const [transformation, setTransformation] = useState(new Transformation());
  const [state1, setState1] = useState(new StateNode([vector1], transformation));
  const [state2, setState2] = useState(new StateNode([vector2], transformation));
  const [state3, setState3] = useState(new StateNode([vector3], transformation));

  const { list, setList } = useListContext();

  useEffect(() => {
    list.insertHead(state1);

    state1._next = state2;
    state2._next = state3;
    const node = list.getAt(1);

    // prettier-ignore
    if (node) { node._next = new StateNode([vector4], transformation); }
    console.log("Home; list[0]: ", list.getAt(0));
  }, [list]);
  return (
    <>
      <TestContextComponent />
    </>
  );
};

export default Home;
