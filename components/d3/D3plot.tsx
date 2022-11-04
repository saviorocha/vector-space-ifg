import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useD3Context, useListContext, useNameContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plotComponent";
import styles from "../../styles/modules/D3.module.css";
import { useConfigContext } from "../../context/ConfigContext";
import Vector from "../../classes/vector";

const D3Plot: FunctionComponent<IPlotProps> = ({ index }) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );

  const { hideNumbers, showBasisVectors } = useConfigContext();
  const { dimension, events } = useD3Context();
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();

  useEffect(initD3, [stateVecArr, events, hideNumbers, showBasisVectors]);


  function initD3() {
    const section = d3.select(refElement.current);

    let vectorsMap = stateVecArr.vectorArr[index];
    if (!showBasisVectors) { // filter out the basis vectors
      vectorsMap = vectorsMap.filter((vector: Vector) => {
        return !vector.isBasisVector;
      });
    }

    const vectors = vectorsMap.map((vector) => {
      return vector.d3VectorFormat();
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
      className="text-center relative snap-start cursor-move"
      id={styles.plot}
      ref={refElement}
    ></aside>
  );
};

export default D3Plot;
