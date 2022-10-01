import * as d3 from "d3";
import { ScaleLinear, ZoomBehavior } from "d3";
class PlotComponent {
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
    vectors: VectorData[][],
    eventsArr: EventFunction[]
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
    // this.createAxis(width, height);
    this.createPlot();

    // that's not how I wanted to deal with events
    // but it's the solution I've got so far (￢_￢;)
    if (eventsArr.length) {
      this.addEvents(eventsArr);
    } else {
      this.createZoom();
    }
    // @ts-ignore
    this.createLine(this.x, this.y);
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

    // sets the domain
    const defaultMax = 5;
    const defaultMin = -5;
    this.x.domain([defaultMin, defaultMax]);
    this.y.domain([defaultMin, defaultMax]);

    // add the axis
    this.svg.selectAll("#myXaxis").call(this.xAxis);
    this.svg.selectAll("#myYaxis").call(this.yAxis);
  };

  /**
   * Executes a set of functions to add events to the plot svg
   * @param {EventFunction[]} eventsArr
   */
  addEvents = (eventsArr: EventFunction[]) => {
    for (let i = 0; i < eventsArr.length; i++) {
      eventsArr[i]();
    }
  };

  /**
   * Sets the zoom and pan features: how much you can zoom, on which part, and what to do when there is a zoom
   */
  createZoom = () => {
    const zoom: ZoomBehavior<any, unknown> = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", this.handleVectorZoom);

    this.createLine(this.x, this.y);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    this.svg
      .append("rect")
      .attr("id", "zoom-rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      )
      .call(zoom);
  };

  /**
   *  Updates the chart values when the user zoom and thus new boundaries are available
   */
  handleVectorZoom = (event: any) => {
    // recover the new scale
    const newX = event.transform.rescaleX(this.x);
    const newY = event.transform.rescaleY(this.y);

    // new domain values calculated, based on the dimension,
    // to be used on the svg's translate attribute
    let newDomain = [
      -(this.height - this.height / 2),
      0,
      this.height - this.height / 2,
      this.height,
    ];
    // let newDomain = [-180, 0, 180, 360];
    newDomain = newDomain.map((n) => {
      return event.transform.k * n;
    });

    let xRange = [
      0,
      this.height / 2,
      this.height,
      this.height + this.height / 2,
    ];
    // let xRange = [0, 180, 360, 540];
    xRange = xRange.map((n) => {
      return event.transform.k * n;
    });

    let yRange = [
      10,
      this.height / 2 + 10,
      this.height + 10,
      this.height + this.height / 2 + 10,
    ];
    // let yRange = [10, 190, 370, 550];
    yRange = yRange.map((n) => {
      return event.transform.k * n;
    });

    // scales used on the translate to be able to move the axes along with the vectors
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

  /**
   * Draws a D3 line to represent a vector, using the vector's coordinates data
   * @param x the class x scale function
   * @param y the class y scale function
   */
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

export default PlotComponent;
