import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Vector from "../components/vector";
import styles from "../styles/Home.module.css";
import {multiply, matrix} from "mathjs";

const Home: NextPage = () => {
  const [vector, setVector] = useState(
    new Vector(1, 2, "")
  );

  // useEffect(() => {
  //   console.log(vector);
  //   const matrix1 = matrix([
  //     [1, -4],
  //     [2, 7],
  //   ]);
  //   console.log(vector.array);
    
  //   console.log("multiply", multiply(matrix1, vector.array));
    
  // }, []);

  return <div className={styles.container}>Página inicial</div>;
};

export default Home;
