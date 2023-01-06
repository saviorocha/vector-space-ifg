import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useD3Context, useListContext, useNameContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plotComponent";
import styles from "../../styles/modules/pages/D3.module.css";
import { useConfigContext } from "../../context/ConfigContext";
import Vector from "../../classes/vector";
import useD3Events from "../../hooks/useD3Events";

const D3Plot: FunctionComponent<IPlotProps> = ({ index }) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );

  const { hideNumbers, showBasisVectors, vectorColor } = useConfigContext();
  const { dimension, events } = useD3Context();
  const { dragVector } = useD3Events();
  const { stateVecArr } = useListContext();
  const { currentPlot } = useNameContext();

  // eslint-disable-next-line
  useEffect(initD3, [
    stateVecArr,
    events,
    hideNumbers,
    showBasisVectors,
    dimension,
    vectorColor,
  ]);

  useEffect(() => {
    // console.log("stateVecArr", stateVecArr)
  }, [stateVecArr]);

  function initD3() {
    const section = d3.select(refElement.current);

    let vectorsMap = stateVecArr.vectorArr[index];
    if (!showBasisVectors) {
      // filter out the basis vectors
      vectorsMap = vectorsMap.filter((vector: Vector) => {
        return !vector.isBasisVector;
      });
    }

    const data = vectorsMap.map((vector: Vector) => {
      return vector.d3VectorFormat();
    });

    setD3Component(
      new PlotComponent(
        refElement.current,
        dimension,
        data,
        hideNumbers,
        events,
        currentPlot,
        vectorColor,
        dragVector,
        index + 1
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
