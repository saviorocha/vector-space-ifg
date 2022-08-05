import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PlotComponent from "./d3/plot-component";
import { useListContext } from "../context";

let vector;
const D3Plot = () => {
  const marginValues = { top: 10, right: 30, bottom: 30, left: 50 };
  const size: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };

  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState(null);
  const { list, setList } = useListContext();

  useEffect(initD3, []);

  function initD3() {
    const div = d3.select(refElement.current);
    const node = [
      ...list.head?.vectors,
      list.head?.transformation.e1Vector,
      list.head?.transformation.e2Vector,
    ].map((vec) => {
      return [
        { coord1: 0, coord2: 0 },
        { coord1: vec.array[0], coord2: vec.array[1] },
      ];
    });

    setD3Component(new PlotComponent(refElement.current, size,  node));
    return () => {
      div.selectAll("*").remove();
    };
  }

  return <div ref={refElement}></div>;
};

export default D3Plot;
