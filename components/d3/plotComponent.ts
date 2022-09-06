import * as d3 from "d3";
import { ScaleLinear, ZoomBehavior } from "d3";
class PlotComponent {
  svg;
  vectors: VectorData[][];
  margin: Margin;

  // @ts-ignore
  x: ScaleLinear<number, number>;
  // @ts-ignore
  y: ScaleLinear<number, number>;
  xAxis: any;
  yAxis: any;

  constructor(
    refComponent: null | HTMLDivElement,
    dimensions: Dimesion,
    vectors: VectorData[][]
  ) {
    const { margin, width, height } = dimensions;
    this.vectors = vectors;
    this.margin = margin;

    this.svg = d3
      .select(refComponent)
      .append("svg:svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("id", "plane")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    this.createAxis(width, height);
    this.createChart(width, height);
    this.createZoom(width, height, margin);
    this.createVector();
  }

  createAxis = (width: number, height: number) => {
    // Initialise a X axis:
    this.x = d3.scaleLinear().range([0, width]);
    this.xAxis = d3.axisBottom(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${height / 2})`)
      .attr("id", "myXaxis");
    // Initialize an Y axis
    this.y = d3.scaleLinear().range([height, 0]);
    this.yAxis = d3.axisLeft(this.y);
    this.svg
      .append("g")
      .attr("transform", `translate(${width / 2}, 0)`)
      .attr("id", "myYaxis");
  };

  createChart = (width, height) => {
    const defaultMax = 5;
    const defaultMin = -5;
    const maxX = d3.max(this.vectors, function (data) {
      return data[1].coord1;
    });
    const minX = d3.min(this.vectors, function (data) {
      return data[1].coord1;
    });
    const maxY = d3.max(this.vectors, function (data) {
      return data[1].coord2;
    });
    const minY = d3.min(this.vectors, function (data) {
      return data[1].coord2;
    });

    // Create the X axis:
    this.x.domain([
      minX && minX < defaultMin ? minX : defaultMin,
      maxX && maxX > defaultMax ? maxX : defaultMax,
    ]);
    this.svg.selectAll("#myXaxis").transition().duration(3000).call(this.xAxis);
    // create the Y axis
    this.y.domain([
      minY && minY < defaultMin ? minY : defaultMin,
      maxY && maxY > defaultMax ? maxY : defaultMax,
    ]);
    this.svg.selectAll("#myYaxis").transition().duration(3000).call(this.yAxis);

    // d3.select("#plane")
    //   .append("rect")
    //   .attr("id", "clicktest")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("fill", "none")
    //   .style("pointer-events", "all")
    //   .attr("transform", "translate(0,0)")
    //   .on("click", this.clickTest);
  };

  clickTest = (event) => {
    // console.log("x(1)", x(1));
    // console.log("y(1)", y(1));

    // (doesn't change with resize!)
    // domínioX: width
    // domínioY: height

    // rangeX: xAxis.scale().range()
    // rangeY: yAxis.scale().range()
    const clickX = d3.scaleLinear().domain([0, 380]).range([-5, 5]);
    const clickY = d3.scaleLinear().domain([0, 360]).range([5, -5]);
    // const clickX = d3.scaleLinear().domain([0, this.height]).range();
    // console.log("pointerx", d3.pointer(event)[0]);
    // console.log("pointery", d3.pointer(event)[1]);
    // console.log("xaxis", this.yAxis.scale().domain())
    // console.log("transformedx", clickX(d3.pointer(event)[0]));
    // console.log("transformedy", clickY(d3.pointer(event)[1]));
    this.vectors.push([
      { coord1: 0, coord2: 0 },
      {
        coord1: clickX(d3.pointer(event)[0]),
        coord2: clickY(d3.pointer(event)[1]),
      },
    ]);
    this.createLine(this.x, this.y);
    // console.log("pointerx", x.invert(d3.pointer(event)[0]));
    // console.log("pointery", y.invert(d3.pointer(event)[1]));
    // console.log("layerx", event.layerX);
    // console.log("layerx invert", x.invert(event.layerX));
    // console.log("event", event);
    // console.log("x is " + x.invert(d3.pointer(this)[0]));
    // console.log("y is " + y.invert(e.pageY));
  };

  // Sets the zoom and pan features: how much you can zoom, on which part, and what to do when there is a zoom
  createZoom = (width: number, height: number, margin: Margin) => {
    const zoom: ZoomBehavior<any, unknown> = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", this.handleVectorZoom);

    this.createLine(this.x, this.y);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    this.svg
      .append("rect")
      .attr("id","zoom-rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
  };

  // Function that updates the chart when the user zoom and thus new boundaries are available
  handleVectorZoom = (event: any) => {
    // recover the new scale
    const newX = event.transform.rescaleX(this.x);
    const newY = event.transform.rescaleY(this.y);

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
    this.svg
      .selectAll("#myXaxis")
      .attr("transform", `translate(0, ${xAxisScale(event.transform.y)})`)
      .call(d3.axisBottom(newX) as any);
    this.svg
      .selectAll("#myYaxis")
      .attr("transform", `translate(${yAxisScale(event.transform.x)}, 0)`)
      .call(d3.axisLeft(newY) as any);

    // update vector position
    this.createLine(newX, newY);
  };

  createLine = (
    x: ScaleLinear<number, number>,
    y: ScaleLinear<number, number>
  ) => {
    // console.log("line", line.x);
    this.svg
      .selectAll(".lineVector")
      .data(this.vectors, function (data: any) {
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
  createVector = () => {
    let def = this.svg
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
}

export default PlotComponent;
