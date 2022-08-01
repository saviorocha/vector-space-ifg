import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Vector from "../classes/vector";
import styles from "../styles/Home.module.css";
import Transformation from "../classes/transformation";
import StateNode from "../classes/stateNode";
import StateList from "../classes/stateList";

const Home: NextPage = () => {
  const [vector1, setVector1] = useState(new Vector([1, 1]));
  const [vector2, setVector2] = useState(new Vector([2, 2]));
  const [vector3, setVector3] = useState(new Vector([3, 3]));
  const [vector4, setVector4] = useState(new Vector([4, 4]));
  const [transformation, setTransformation] = useState(new Transformation());

  useEffect(() => {
    const state1 = new StateNode([vector1], transformation);
    const state2 = new StateNode([vector2], transformation);
    const state3 = new StateNode([vector3], transformation);
    const stateList = new StateList(state1);
    // console.log("state1", state1);

    state1._next = state2;
    state2._next = state3;
    const node = stateList.getAt(1);
  
    if (node) {
      node._next = new StateNode([vector4], transformation);
    }
    console.log("stateList: ", stateList);

    // console.log("transformation: ", transformation.applyTransformation(vector));
  }, []);

  return <div className={styles.container}>Página inicial</div>;
};

export default Home;
