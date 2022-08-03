import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PlotComponent from "./d3/plot-component";

let vector;
const D3Plot = () => {
    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const refElement = useRef(null);
  const [d3Component, setD3Component] = useState(null);
  const [data1, setData1] = useState([
    { ser1: 0, ser2: 0 },
    { ser1: 2, ser2: 2 },
  ]);
//   const [data2, setData2] = useState([
//     { ser1: 0, ser2: 0 },
//     { ser1: 3, ser2: 7 },
//   ]);

  useEffect(initD3, []);

  function initD3() {
    const div = d3.select(refElement.current);
    setD3Component(new PlotComponent(refElement.current, {
        data1,
        margin,
        width,
        height,
      }));
    return () => {
      div.selectAll("*").remove();
    };
  }
  
  return <div ref={refElement}></div>;
};

export default D3Plot;
