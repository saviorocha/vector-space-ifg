import * as d3 from "d3";
class PlotComponent {
  svg;
  refComponent;
  x;
  y;
  xAxis;
  yAxis;
  data;
  width;
  height;

  constructor(refComponent, { data1, margin, width, height }) {
    this.refComponent = refComponent;
    this.data = data1;
    this.width = width;
    this.height = height;
    this.svg = d3
      .select(refComponent)
      .append("svg:svg")
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    this.createAxis();
    this.createChart(data1);
    this.createVector();
    this.panAxes(margin);
    // this.
  }

  createAxis = () => {
    // Initialise a X axis:
    this.x = d3.scaleLinear().range([0, this.width]);
    this.xAxis = d3.axisBottom(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height / 2})`)
      .attr("id", "myXaxis");
    // Initialize an Y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = d3.axisLeft(this.y);
    this.svg
      .append("g")
      .attr("transform", `translate(${this.width / 2}, 0)`)
      .attr("id", "myYaxis");
  };

  createChart = (data) => {
    // const yAxisZoom = d3.zoom().on("zoom", () => {
    //   this.y.domain(d3.event.transform.rescaleY(y2).domain());
    //   render();
    // });

    // const yAxisDrag = d3.drag().on("drag", () => {
    //   const factor = Math.pow(2, -d3.event.dy * 0.01);
    //   d3.select("#zoom-chart .plot-area").call(yAxisZoom.scaleBy, factor);
    // });

    const maxX = d3.max(data, function (d) {
      return d.ser1;
    });
    const minX = d3.min(data, function (d) {
      return d.ser1;
    });
    const maxY = d3.max(data, function (d) {
      return d.ser2;
    });
    const minY = d3.min(data, function (d) {
      return d.ser2;
    });

    const defaultMax = 5;
    const defaultMin = -5;

    // Create the X axis:
    this.x.domain([
      minX < defaultMin ? minX : defaultMin,
      maxX > defaultMax ? maxX : defaultMax,
    ]);
    this.svg.selectAll("#myXaxis").transition().duration(3000).call(this.xAxis);
    // console.log("xAxis", this.zoomTest);
    // create the Y axis
    this.y.domain([
      minY < defaultMin ? minY : defaultMin,
      maxY > defaultMax ? maxY : defaultMax,
    ]);
    this.svg.selectAll("#myYaxis").transition().duration(3000).call(this.yAxis);

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", this.handleVectorZoom);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    // this.svg
    //   .append("rect")
    //   .attr("width", this.width)
    //   .attr("height", this.height)
    //   .style("fill", "none")
    //   .style("pointer-events", "all")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //   .call(zoom);

    let x = this.x;
    let y = this.y;
    this.createLine(this.x, this.y);
  };

  // A function that updates the chart when the user zoom and thus new boundaries are available
  handleVectorZoom = (event) => {
    // recover the new scale
    const newX = event.transform.rescaleX(this.x);
    const newY = event.transform.rescaleY(this.y);

    // update axes with these new boundaries
    this.svg.selectAll("#myXaxis").call(d3.axisBottom(newX));
    this.svg.selectAll("#myYaxis").call(d3.axisLeft(newY));

    // update vector position
    this.createLine(newX, newY);
  };
  createLine = (x, y) => {
    this.svg
      .selectAll(".lineVector")
      .data([this.data], function (d) {
        return d.ser1;
      })
      .join("path")
      .attr("class", "lineVector")
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.ser1);
          })
          .y(function (d) {
            return y(d.ser2);
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
    let def = this.svg.append("defs");
    def = def.append("marker");
    def = def
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "12")
      .attr("markerHeight", "12")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "6")
      .attr("refY", "6")
      .attr("orient", "auto");
    def
      .append("path")
      .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      .style("fill", "teal");
  };

  panAxes = (margin) => {

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 20])
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", (event) => {
        // recover the new scale
        const newX = event.transform.rescaleX(this.x);
        const newY = event.transform.rescaleY(this.y);

        // console.log("newX", newX);
        // console.log("x", this.x);
        console.log(event.transform.x);

        // update axes with these new boundaries
        this.svg
          .selectAll("#myXaxis")
          .attr("transform", `translate(0, ${(this.height / 2) / event.transform.x})`)
          .call(d3.axisBottom(newX));
        // this.svg
        //   .selectAll("#myYaxis")
        //   .attr("transform", `translate(0, ${this.width / 2})`)
        //   .call(d3.axisLeft(newY));
      });
    this.svg
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
  };

}

export default PlotComponent;
