import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Vector from "../components/vector";
import styles from "../styles/Home.module.css";
import { multiply, matrix } from "mathjs";
import Transformation from "../components/transformation";

const Home: NextPage = () => {
  const [vector, setVector] = useState(new Vector([1, 2]));
  const [transformation, setTransformation] = useState(new Transformation([1,1], [1,2]));

  useEffect(() => {
    console.log("transformation: ", transformation.applyTransformation(vector));
  }, []);

  return <div className={styles.container}>Página inicial</div>;
};

export default Home;
