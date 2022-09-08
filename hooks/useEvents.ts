import * as d3 from "d3";
import { ScaleLinear, ZoomBehavior } from "d3";
import StateList from "../classes/stateList";
import Vector from "../classes/vector";
import { useD3Context, useListContext } from "../context";
import useList from "./useList";

const useEvents = () => {
  const { addVector } = useList();
  const { setList, setStateVecArr } = useListContext();
  const { dimension } = useD3Context();
  const { width, height, margin } = dimension;
  const { stateVecArr } = useListContext();
  const vectors = stateVecArr[0].map((vec) => {
    return vec.d3VectorFormat();
  });

  const addVectorOnClick = () => {
    d3.select("#zoom-rect").remove();
    d3.select("#plane")
      .append("rect")
      .attr("id", "clicktest")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .on("click", (event: any) => {
        // (doesn't change with screen resize!)
        // domainX: width  -> 380
        // domainY: height -> 360

        // (changes with zoom in and zoom out)
        // rangeX: xAxis.scale().range() -> [-5, 5]
        // rangeY: yAxis.scale().range() -> [5, -5]
        const clickX = d3.scaleLinear().domain([0, width]).range([-5, 5]);
        const clickY = d3.scaleLinear().domain([0, height]).range([5, -5]);

        // const xCoord = clickX(d3.pointer(event)[0]);
        // const yCoord = clickY(d3.pointer(event)[1]);

        // (Math.round(num * 100) / 100).toFixed(2); - 1.34252 -> 1.34
        const newHead = addVector(
          new Vector(
            [clickX(d3.pointer(event)[0]), clickY(d3.pointer(event)[1])]
            // "#bb00ff"
          )
        );

        const newList = new StateList(newHead);
        setList(newList);
        setStateVecArr(newList.toArray());
      });
  };

  const addZoom = () => {
    const svg = d3.select("#svgPlane");

    console.log("addZoom");
    const zoom: ZoomBehavior<any, unknown> = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", handleVectorZoom);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    svg
      .append("rect")
      .attr("id", "zoom-rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
      createVector();
  };

  // Function that updates the chart when the user zoom and thus new boundaries are available
  const handleVectorZoom = (event: any) => {
    const svg = d3.select("#svgPlane");
    const x = d3.scaleLinear().domain([-5, 5]).range([0, width]);
    const y = d3.scaleLinear().domain([-5, 5]).range([height, 0]);

    // recover the new scale
    const newX = event.transform.rescaleX(x);
    const newY = event.transform.rescaleY(y);

    let newDomain = [-180, 0, 180, 360];
    newDomain = newDomain.map((n) => {
      return event.transform.k * n;
    });

    let xRange = [0, 180, 360, 540];
    xRange = xRange.map((n) => {
      return event.transform.k * n;
    });

    let yRange = [10, 190, 370, 550];
    yRange = yRange.map((n) => {
      return event.transform.k * n;
    });

    // scales used to be able to move the axes along with the vectors
    const xAxisScale = d3.scaleLinear().domain(newDomain).range(xRange);
    const yAxisScale = d3.scaleLinear().domain(newDomain).range(yRange);

    // update axes with these new boundaries
    svg
      .selectAll("#myXaxis")
      .attr("transform", `translate(0, ${xAxisScale(event.transform.y)})`)
      .call(d3.axisBottom(newX) as any);
    svg
      .selectAll("#myYaxis")
      .attr("transform", `translate(${yAxisScale(event.transform.x)}, 0)`)
      .call(d3.axisLeft(newY) as any);

    // update vector position
    createLine(newX, newY);
  };
  const createLine = (
    x: ScaleLinear<number, number>,
    y: ScaleLinear<number, number>
  ) => {
    const svg = d3.select("#svgPlane");
    svg
      .selectAll(".lineVector")
      .data(vectors, function (data: any) {
        return data.coord1;
      })
      .join("path")
      .attr("class", "lineVector")
      .attr(
        "d",
        d3
          .line<any>()
          .x(function (data) {
            return x(data.coord1);
          })
          .y(function (data) {
            return y(data.coord2);
          })
      )
      // clip-path: everything outside this area won't be drawn
      .attr("clip-path", "url(#chart-area)")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");
  };

  // adds the vector's arrow to the line element
  const createVector = () => {
    const svg = d3.select("#svgPlane");
    let def = svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "12")
      .attr("markerHeight", "10")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "6")
      .attr("refY", "6")
      .attr("orient", "auto");
    def
      .append("path")
      .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      .style("fill", "steelblue");
  };
  return { addVectorOnClick, addZoom };
};

export default useEvents;
