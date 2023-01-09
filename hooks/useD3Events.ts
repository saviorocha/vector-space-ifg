import * as d3 from "d3";
import { DragBehavior, ScaleLinear } from "d3";
import StateList from "../classes/stateList";
import Vector from "../classes/vector";
import { useD3Context, useListContext, useNameContext } from "../context";
import { useConfigContext } from "../context/ConfigContext";
import useList from "./useList";

/**
 * Custom hook for d3 events that changes the transformation list
 */
const useD3Events = () => {
  const { addVector, updateVector } = useList();
  const { decimalPoint } = useConfigContext();
  const { setList, setStateVecArr } = useListContext();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();
  const { dimension } = useD3Context();
  const { width, height } = dimension;

  /**
   * Event to add a vector by clicking on the plane
   */
  const addVectorOnClick = () => {
    // d3.select("#zoom-rect").remove();

    // container for click event 
    d3.select("#plane-1")
      .append("rect")
      .attr("id", "vectorclick")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "crosshair")
      .on("click", (event: any) => {
        // (doesn't change with screen resize!)
        // domainX: svg-width  -> 380
        // domainY: svg-height -> 360

        // (changes with zoom in and zoom out)
        // rangeX: xAxis.scale().range() -> [-5, 5]
        // rangeY: yAxis.scale().range() -> [5, -5]

        // scales to calculate x,y values
        const clickX = d3.scaleLinear().domain([0, width]).range([-5, 5]);
        const clickY = d3.scaleLinear().domain([0, height]).range([5, -5]);

        // calculate the coordinates
        const xCoord = clickX(d3.pointer(event)[0]);
        const yCoord = clickY(d3.pointer(event)[1]);

        // adds the vector to the list
        const newHead = addVector(
          new Vector(
            [
              {
                value: xCoord,
                texExpression: parseFloat(
                  xCoord.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  xCoord.toFixed(decimalPoint)
                ).toString(),
              },
              {
                value: yCoord,
                texExpression: parseFloat(
                  yCoord.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  yCoord.toFixed(decimalPoint)
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
        d3.select(".plane").style("cursor", "default");
      });
    setVectorNameCounter(vectorNameCounter + 1);
  };

  /**
   * Drag and drop event for vectors of the first plane
   * @param x 
   * @param y 
   * @param {number} planeIndex 
   * @returns 
   */
  const dragVector = (
    x: ScaleLinear<number, number>,
    y: ScaleLinear<number, number>,
    planeIndex: number
  ): (() => void) | DragBehavior<Element, unknown, unknown> => {

    // only allows drag on the first plane
    if (planeIndex !== 1) {
      return () => {};
    }

    return d3
      .drag()
      .on("start", function (d) {
        d3.select(this).attr("stroke-width", 3);
      })
      .on("drag", function (e, d: any) {
        if (d[0].name === "e_{1}" || d[0].name === "e_{2}") {
          return;
        }

        // style the mouse cursor
        d3.select("#main-page").style("cursor", "grabbing");
        // console.log(d3.select("#main-page"))

        // calculate new data coordinates
        const newX = x.invert(e.x);
        const newY = y.invert(e.y);
        d[1].coord1 = newX;
        d[1].coord2 = newY;

        // update line
        d3.select(this)
          .join("path")
          .attr(
            "d",
            d3
              .line<any>()
              .x(function (data) {
                return x(data.coord1);
              })
              .y(function (data) {
                return y(data.coord2);
              }) as any
          );
      })
      .on("end", function (e, d: any) {
        if (d[0].name === "e_{1}" || d[0].name === "e_{2}") {
          return;
        }
        const newX = x.invert(e.x);
        const newY = y.invert(e.y);

        // update vector
        const newHead = updateVector(
          new Vector(
            [
              {
                value: newX,
                texExpression: parseFloat(
                  newX.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  newX.toFixed(decimalPoint)
                ).toString(),
              },
              {
                value: newY,
                texExpression: parseFloat(
                  newY.toFixed(decimalPoint)
                ).toString(),
                mathExpression: parseFloat(
                  newY.toFixed(decimalPoint)
                ).toString(),
              },
            ],
            d[0].name
          ),
          d[0].name
        );

        const newList = new StateList(newHead);
        setList(newList);
        setStateVecArr(newList.toArray());
        d3.select("#main-page").style("cursor", "default");
      });
  };

  return { addVectorOnClick, dragVector };
};

export default useD3Events;
