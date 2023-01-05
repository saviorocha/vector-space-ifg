import * as d3 from "d3";
import { ScaleLinear, ZoomBehavior } from "d3";
import StateList from "../classes/stateList";
import Vector from "../classes/vector";
import { useD3Context, useListContext, useNameContext } from "../context";
import { useConfigContext } from "../context/ConfigContext";
import useList from "./useList";

const useD3Events = () => {
  const { addVector, updateVector } = useList();
  const { decimalPoint } = useConfigContext();
  const { setList, setStateVecArr } = useListContext();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();
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

        const valueX = clickX(d3.pointer(event)[0]);
        const valueY = clickY(d3.pointer(event)[1]);

        const newHead = addVector(
          new Vector(
            [
              {
                value: valueX,
                texExpression: parseFloat(
                  valueX.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  valueX.toFixed(decimalPoint)
                ).toString(),
              },
              {
                value: valueY,
                texExpression: parseFloat(
                  valueY.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  valueY.toFixed(decimalPoint)
                ).toString(),
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

  const dragVector = (
    x: ScaleLinear<number, number>,
    y: ScaleLinear<number, number>,
    vecData: string
  ) => {
    return d3.drag().on("drag", function (e, d: any) {
      // calculate new data coordinates
      d[1].coord1 = x.invert(e.x);
      d[1].coord2 = y.invert(e.y);

      // update vector
      const newHead = updateVector(
        new Vector(
          [
            {
              value: x.invert(e.x),
              texExpression: x.invert(e.x).toString(),
              mathExpression: x.invert(e.x).toString(),
            },
            {
              value: y.invert(e.y),
              texExpression: y.invert(e.y).toString(),
              mathExpression: y.invert(e.y).toString(),
            },
          ],
          vecData
        ),
        vecData
      );

      const newList = new StateList(newHead);
      setList(newList);
      setStateVecArr(newList.toArray());

      // update line
      d3.select(this)
        // .data(newVectorData)
        .join("path")
        .attr(
          "d",
          d3
            .line<any>()
            .x(function (data) {
              // console.log("dragx", data.coord1);
              return x(data.coord1);
            })
            .y(function (data) {
              // console.log("dragy", data.coord2);
              return y(data.coord2);
            }) as any
        )
        .attr("clip-path", "url(#chart-area)")
        .attr("fill", "none")
        .attr("stroke", "#4682b4")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)");
    }) as any;
        // .on("end", function (e, d: any) {
        //   d3.select(this).attr("stroke", null);
        // })
      // );
  };

  return { addVectorOnClick, dragVector };
};

export default useD3Events;
