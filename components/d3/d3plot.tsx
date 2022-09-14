import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useD3Context, useListContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plotComponent";
import styles from "../../styles/modules/D3.module.css";

const D3Plot: FunctionComponent<IPlotProps> = ({ index, render = false, translate = 0 }) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );

  const { dimension, events } = useD3Context();
  const { stateVecArr } = useListContext();

  useEffect(initD3, [stateVecArr, events]);

  function initD3() {
    const section = d3.select(refElement.current);

    const vectors = stateVecArr[index].map((vec) => {
      return vec.d3VectorFormat();
    });

    setD3Component(
      new PlotComponent(refElement.current, dimension, vectors, events)
    );

    // cleanup to remove duplicate SVG
    return () => {
      section.selectAll("*").remove();
    };
  }

  return (
    <section
      className={"carousel-item text-center relative snap-start"}
      style={{
        // transform: `translateX(${translate}px)`, //https://codepen.io/Schepp/pen/WNbQByE; https://freefrontend.com/css-carousels/
        display: render ? "block" : "none",
      }}
      id={styles.plot}
      ref={refElement}
    ></section>
  );
};

export default D3Plot;
