import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useD3Context, useListContext, useNameContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plotComponent";
import styles from "../../styles/modules/D3.module.css";

const D3Plot: FunctionComponent<IPlotProps> = ({ index }) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );

  const { dimension, events, hideNumbers } = useD3Context();
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext()

  useEffect(initD3, [stateVecArr, events]);

  function initD3() {
    const section = d3.select(refElement.current);

    const vectors = stateVecArr.vectorArr[index].map((state) => {
      return state.d3VectorFormat();
    });

    setD3Component(
      new PlotComponent(
        refElement.current,
        dimension,
        vectors,
        hideNumbers,
        events,
        currentPlot
      )
    );

    // cleanup to remove duplicate SVG
    return () => {
      section.selectAll("*").remove();
    };
  }

  return (
    <aside
      className="text-center relative snap-start"
      id={styles.plot}
      ref={refElement}
    ></aside>
  );
};

export default D3Plot;
