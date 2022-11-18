import * as d3 from "d3";
import { ZoomBehavior } from "d3";
import StateList from "../classes/stateList";
import Vector from "../classes/vector";
import { useD3Context, useListContext, useNameContext } from "../context";
import { useConfigContext } from "../context/ConfigContext";
import useList from "./useList";

const useD3Events = () => {
  const { addVector } = useList();
  const { setList, setStateVecArr } = useListContext();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();
  const { decimalPoint } = useConfigContext();
  const { dimension } = useD3Context();
  const { width, height } = dimension;

  const addVectorOnClick = () => {
    // d3.select("#zoom-rect").remove();
    d3.select("#plane")
      .append("rect")
      .attr("id", "clicktest")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .on("click", (event: any) => {
        // (doesn't change with screen resize!)
        // domainX: svg-width  -> 380
        // domainY: svg-height -> 360

        // (changes with zoom in and zoom out)
        // rangeX: xAxis.scale().range() -> [-5, 5]
        // rangeY: yAxis.scale().range() -> [5, -5]
        const clickX = d3.scaleLinear().domain([0, width]).range([-5, 5]);
        const clickY = d3.scaleLinear().domain([0, height]).range([5, -5]);

        // const xCoord = clickX(d3.pointer(event)[0]);
        // const yCoord = clickY(d3.pointer(event)[1]);

        // (Math.round(num * 100) / 100).toFixed(2); - 1.34252 -> 1.34

        const valueX = parseFloat(
          clickX(d3.pointer(event)[0]).toFixed(decimalPoint)
        );
        const valueY = parseFloat(
          clickY(d3.pointer(event)[1]).toFixed(decimalPoint)
        );
        const newHead = addVector(
          new Vector(
            [
              {
                value: valueX,
                texExpression: valueX.toString(),
              },
              {
                value: valueY,
                texExpression: valueY.toString(),
              },
            ],
            `v_{${vectorNameCounter}}`
            // "#bb00ff"
          )
        );

        const newList = new StateList(newHead);
        setList(newList);
        setStateVecArr(newList.toArray());
      });
    setVectorNameCounter(vectorNameCounter + 1);
  };

  return { addVectorOnClick };
};

export default useD3Events;
