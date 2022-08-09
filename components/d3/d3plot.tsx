import * as d3 from "d3";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useListContext } from "../../context";
import PlotComponent from "./plot-component";

let vector;
const D3Plot: FunctionComponent = ({ stateVectors }) => {
  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };

  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<PlotComponent>(
    {} as PlotComponent
  );
  const { list } = useListContext();

  useEffect(initD3, [list]);

  function initD3() {
    // console.log("lista d3plot: ", list);
    // console.log("vetores: ", list.head?.vectors);

    const div = d3.select(refElement.current);
    const node = stateVectors.map((vec) => {
      return vec?.d3VectorFormat()!;
    });

    setD3Component(new PlotComponent(refElement.current, dimensions, node));
    
    // cleanup to remove duplicate SVG
    return () => {
      div.selectAll("*").remove();
    };
  }

  return <div ref={refElement}></div>;
};

export default D3Plot;
