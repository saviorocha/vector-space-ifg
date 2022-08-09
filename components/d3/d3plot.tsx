import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useListContext } from "../../context";
import { IPlotProps } from "../../interfaces/interfaces";
import PlotComponent from "./plot-component";

let vector;
const D3Plot: FunctionComponent<IPlotProps> = ({
  stateVectors,
  plotDimensions,
}) => {
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );
  const { list } = useListContext();

  useEffect(initD3, [list]);

  function initD3() {
    const div = d3.select(refElement.current);
    const node = stateVectors.map((vec) => {
      return vec?.d3VectorFormat()!;
    });

    setD3Component(new PlotComponent(refElement.current, plotDimensions, node));

    // cleanup to remove duplicate SVG
    return () => {
      div.selectAll("*").remove();
    };
  }

  return <div ref={refElement}></div>;
};

export default D3Plot;