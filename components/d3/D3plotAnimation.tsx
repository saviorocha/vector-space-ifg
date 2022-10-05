import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useD3Context, useListContext } from "../../context";
import styles from "../../styles/modules/D3.module.css";
import AnimationPlotComponent from "./animationPlotComponent";

const D3PlotAnimation = ({}) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<AnimationPlotComponent>(
    {} as AnimationPlotComponent
  );
  const [initData1, setData1] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: 1, coord2: 2 },
  ]);

  const [initData2, setData2] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: -1, coord2: 2 },
  ]);

  const [postData1, setPostData1] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: 1, coord2: 4 },
  ]);

  const [postData2, setPostData2] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: -1, coord2: 4 },
  ]);

  const [finalData1, setfinalData1] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: -1, coord2: 4 },
  ]);

  const [finalData2, setfinalData2] = useState([
    { coord1: 0, coord2: 0 },
    { coord1: 1, coord2: 4 },
  ]);

  const [vectorsArr, setVectorsArr] = useState([
    [initData1, initData2],
    [postData1, postData2],
    [finalData1, finalData2],
  ]);
  const { dimension, events } = useD3Context();
  const { stateVecArr } = useListContext();
  // const [vecCounter, setVecCounter] = useState(0);
  // const [currentVectors, setCurrentVectors] = useState(
  //   stateVecArr.vectorArr[vecCounter].map((state) => {
  //     return state.d3VectorFormat();
  //   })
  // );

  const handleAnimation = () => {
    let run = 1;

    const interval = setInterval(() => {
      // vectors = stateVecArr.vectorArr[run].map((state) => {
      //   return state.d3VectorFormat();
      // });
      d3Component.updateData(vectorsArr[run]);
      // console.log("vectors", vectorsArr[run])
      run++;
      // console.log("interval", run);
      if (run === vectorsArr.length) {
        // if (run === stateVecArr.transformationArr.length) {
        clearInterval(interval);
      }
    }, 3000);
  };

  useEffect(() => {
    console.log("stateVecArr useffect", stateVecArr.vectorArr);
    const section = d3.select(refElement.current);
    // vectors = stateVecArr.vectorArr[0].map((state) => {
    //   return state.d3VectorFormat();
    // });
    setD3Component(
      // stateVecArr.vectorArr[0].map((state) => {
      //   return state.d3VectorFormat();
      // })
      new AnimationPlotComponent(refElement.current, dimension, vectorsArr[0])
    );

    // cleanup to remove duplicate SVG and interval
    return () => {
      section.selectAll("*").remove();
      // clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   let run = 0;
  //   const interval = setInterval(() => {
  //     setVecCounter((prevCounter) => prevCounter + 1);
  //     // setCurrentVectors(stateVecArr.vectorArr[vecCounter]);
  //     // d3Component.updateData();
  //     run++;
  //     if (run === 5) {
  //       clearInterval(interval);
  //     }
  //   }, 2000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      <section id={styles.plot} ref={refElement}></section>
      <button onClick={handleAnimation}>só vai</button>
    </>
  );
};

export default D3PlotAnimation;
