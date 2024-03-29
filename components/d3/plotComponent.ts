import * as d3 from "d3";
import { D3DragEvent, ScaleLinear, ZoomBehavior } from "d3";
class PlotComponent {
  svg;
  data: VectorData[];
  vectors: CoordinateData[][];
  margin: Margin;
  width: number;
  height: number;
  hideNumbers: boolean;
  currentPlot: number;
  vectorColor: string;
  dragFunction: any;
  planeIndex: number;
  // @ts-ignore
  x: ScaleLinear<number, number>;
  // @ts-ignore
  y: ScaleLinear<number, number>;
  xAxis: any;
  yAxis: any;
  // @ts-ignore
  zoom: ZoomBehavior<any, unknown>;

  constructor(
    refComponent: null | HTMLDivElement,
    dimensions: Dimesion,
    data: VectorData[],
    hideNumbers: boolean,
    eventsArr: EventFunction[],
    currentPlot: number,
    vectorColor: string,
    dragFunction: any,
    planeIndex: number,
  ) {
    const { margin, width, height } = dimensions;
    this.data = data;
    this.vectors = data.map((el, i) => {
      return el.coordinates;
    });
    this.margin = margin;
    this.width = width;
    this.height = height;
    this.hideNumbers = hideNumbers;
    this.currentPlot = currentPlot;
    this.vectorColor = vectorColor;
    this.dragFunction = dragFunction;
    this.planeIndex = planeIndex;

    this.svg = d3
      .select(refComponent)
      .attr("id", "myPlane")
      .append("svg:svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("id", `plane-${planeIndex}`)
      .attr("class", "plane")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    this.createAxis();

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
    this.events();
  }

  /**
   * Initializes axis values and adds them to the svg to create the plot
   */
  createAxis = () => {
    // initialize a X axis:
    this.x = d3.scaleLinear().range([0, this.width]);
    this.xAxis = d3.axisBottom(this.x).scale(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height / 2})`)
      .attr("id", "myXaxis");

    // initialize an Y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = d3.axisLeft(this.y).scale(this.y);
    this.svg
      .append("g")
      .attr("transform", `translate(${this.width / 2}, 0)`)
      .attr("id", "myYaxis");

    // sets the domain
    const defaultMax = 5;
    const defaultMin = -5;
    this.x.domain([defaultMin, defaultMax]);
    this.y.domain([defaultMin, defaultMax]);

    if (this.hideNumbers) {
      this.xAxis = this.xAxis.tickFormat((d: any, i: number) => [""][i]);
      this.yAxis = this.yAxis.tickFormat((d: any, i: number) => [""][i]);
    }

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

  events = () => {
    d3.select("#toggle-numbers").on("click", this.displayNumbers);
    d3.select("#zoom-in").on("click", this.zoomIn);
    d3.select("#zoom-out").on("click", this.zoomOut);
    d3.select("#reset-zoom").on("click", this.resetPosition);
  };

  displayNumbers = () => {
    d3.select("#myXaxis").remove();
    d3.select("#myYaxis").remove();

    this.hideNumbers = !this.hideNumbers;
    this.createAxis();
    this.createZoom();
  };
  zoomIn = () =>
    this.zoom.scaleBy(d3.select("#svgPlot").transition().duration(750), 1.3);
  zoomOut = () =>
    this.zoom.scaleBy(
      d3.select("#svgPlot").transition().duration(750),
      1 / 1.3
    );
  resetPosition = () => {
    d3.select(`#zoom-rect-${this.currentPlot}`)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  };

  /**
   * Sets the zoom and pan features: how much you can zoom, on which part, and what to do when there is a zoom;
   */
  createZoom = () => {
    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", this.handleVectorZoom)
      .on("end", function (e) {
        d3.selectAll(".plane").style("cursor", "default");
      });

    this.createLine(this.x, this.y);

    // This add an invisible rect on top of the chart area.
    // This rect can recover pointer events: necessary to understand when the user zoom
    this.svg.select(`zoom-rect-${this.currentPlot}`).remove();
    this.svg
      .append("rect")
      .attr("id", `zoom-rect-${this.currentPlot}`)
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      )
      .call(this.zoom);
  };

  /**
   *  Updates the chart values when the user zoom and thus new boundaries are available
   */
  handleVectorZoom = (event: any) => {
    d3.selectAll(".plane").style("cursor", "move");

    // recover the new scale
    const newX = event.transform.rescaleX(this.x);
    const newY = event.transform.rescaleY(this.y);

    // new domain values calculated to be used on the
    // svg's translate attribute, based on the dimension
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

    // new axis for the new plots created after the zoom or pan
    let newXAxis = d3.axisBottom(newX) as any;
    let newYAxis = d3.axisLeft(newY) as any;

    if (this.hideNumbers) {
      newXAxis = newXAxis.tickFormat((d: any, i: number) => [""][i]);
      newYAxis = newYAxis.tickFormat((d: any, i: number) => [""][i]);
    }

    // update axes with these new boundaries
    this.svg
      .selectAll("#myXaxis")
      .attr("transform", `translate(0, ${xAxisScale(event.transform.y)})`)
      .call(newXAxis);
    this.svg
      .selectAll("#myYaxis")
      .attr("transform", `translate(${yAxisScale(event.transform.x)}, 0)`)
      .call(newYAxis);

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
    // console.log("data", this.data)
    this.svg
      .selectAll(".lineVector")
      .raise()
      .data(this.vectors)
      .join("path")
      .attr("class", "lineVector")
      .attr(
        "d",
        d3
          .line<any>()
          .x(function (data) {
            // console.log("datax", data.coord1);
            return x(data.coord1);
          })
          .y(function (data) {
            // console.log("datay", data.coord2);
            return y(data.coord2);
          })
      )
      // clip-path: everything outside this area won't be drawn
      .attr("clip-path", "url(#chart-area)")
      .attr("fill", "none")
      .attr("stroke", this.vectorColor)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)")
      .on("mouseover", function (d) {
        d3.select(this).style("cursor", "grab");
      })
      .call(this.dragFunction(x, y, this.planeIndex));
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
      .style("fill", this.vectorColor);
  };
}

export default PlotComponent;
