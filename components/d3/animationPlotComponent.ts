import * as d3 from "d3";
import { ScaleLinear, ZoomBehavior } from "d3";
class AnimationPlotComponent {
  svg;
  vectors: VectorData[][];
  margin: Margin;
  width: number;
  height: number;

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
    this.width = width;
    this.height = height;

    this.svg = d3
      .select(refComponent)
      .attr("id", "svgPlot")
      .append("svg:svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("id", "plane")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    this.createPlot();

    this.updateData(this.vectors);
    this.createVector();
  }

  /**
   * Initializes axis values and adds them to the svg to create the plot
   */
  createPlot = () => {
    // initialize a X axis:
    this.x = d3.scaleLinear().range([0, this.width]);
    this.xAxis = d3.axisBottom(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height / 2})`)
      .attr("id", "myXaxis");

    // initialize an Y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = d3.axisLeft(this.y);
    this.svg
      .append("g")
      .attr("transform", `translate(${this.width / 2}, 0)`)
      .attr("id", "myYaxis");
  };

  /**
   * Recreates the lines with new vector values 
   */
  updateData = (vecData: VectorData[][]) => {
    const defaultMax = 5;
    const defaultMin = -5;

    this.vectors = vecData;
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
      defaultMin,
      defaultMax,
      // minX && minX < defaultMin ? minX : defaultMin,
      // maxX && maxX > defaultMax ? maxX : defaultMax,
    ]);
    this.svg.selectAll("#myXaxis").call(this.xAxis);
    // create the Y axis
    this.y.domain([
      defaultMin,
      defaultMax,
      // minY && minY < defaultMin ? minY : defaultMin,
      // maxY && maxY > defaultMax ? maxY : defaultMax,
    ]);
    this.svg.selectAll("#myYaxis").call(this.yAxis);

    this.createLine(this.x, this.y);
  };

  /**
   * Draws a D3 line to represent a vector, using the vector's coordinates data
   * @param x the class x scale function
   * @param y the class y scale function
   */
  createLine = (
    x: ScaleLinear<number, number>,
    y: ScaleLinear<number, number>
  ) => {
    this.svg
      .selectAll(`.lineVector`)
      .data(this.vectors)
      .join("path")
      .attr("class", "lineVector")
      .transition()
      .attr("T", 1)
      .duration(2000)
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

  /**
   * Adds the vector's arrow to the line element
   */
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

export default AnimationPlotComponent;
