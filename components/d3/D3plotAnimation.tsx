import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useD3Context, useListContext } from "../../context";
import styles from "../../styles/modules/D3.module.css";
import AnimationPlotComponent from "./animationPlotComponent";

const D3PlotAnimation = () => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<AnimationPlotComponent>(
    {} as AnimationPlotComponent
  );

  const { dimension } = useD3Context();
  const { stateVecArr } = useListContext();

  const handleAnimation = () => {
    let run = 1;

    const interval = setInterval(() => {
      d3Component.updateData(
        stateVecArr.vectorArr[run].map((state) => {
          return state.d3VectorFormat();
        })
      );
      run++;
      if (run === stateVecArr.transformationArr.length) {
        clearInterval(interval);
      }
    }, 2000);
  };

  useEffect(() => {
    const section = d3.select(refElement.current);

    setD3Component(
      new AnimationPlotComponent(
        refElement.current,
        dimension,
        stateVecArr.vectorArr[0].map((state) => {
          return state.d3VectorFormat();
        })
      )
    );

    // cleanup to remove duplicate SVG
    return () => {
      section.selectAll("*").remove();
    };
  }, []);

  return (
    <>
      <section id={styles.plot} ref={refElement}></section>
      <button onClick={handleAnimation}>animate</button>
    </>
  );
};

export default D3PlotAnimation;
