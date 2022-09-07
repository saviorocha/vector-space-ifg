import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useListContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plotComponent";
import styles from "../../styles/modules/D3.module.css";

let vector;
const D3Plot: FunctionComponent<IPlotProps> = ({
  plotDimensions,
  index
}) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );
  const { stateVecArr } = useListContext();

  useEffect(initD3, [stateVecArr]);
  
  function initD3() {
    const section = d3.select(refElement.current);

    const node = stateVecArr[index].map((vec) => {
      return vec.d3VectorFormat();
    });

    setD3Component(new PlotComponent(refElement.current, plotDimensions, node));

    // cleanup to remove duplicate SVG
    return () => {
      section.selectAll("*").remove();
    };
  }

  return (
    <section className={styles.plot} id="d3-plane" ref={refElement}></section>
  );
};

export default D3Plot;
