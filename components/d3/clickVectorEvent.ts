import * as d3 from "d3";

class ClickVectorEvent {
  private svg;
  private width: number;
  private height: number;
  private xCoord: number | undefined;
  private yCoord: number | undefined;

  constructor(dimensions: Dimesion) {
    
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.svg = d3
      .select("#plane")
      .append("rect")
      .attr("id", "clicktest")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(0,0)");

  }

  handleClick = () => {
    this.svg.on("click", this.clickEvent);
  };

  clickEvent = (event: any) => {
    const clickX = d3.scaleLinear().domain([0, 380]).range([-5, 5]);
    const clickY = d3.scaleLinear().domain([0, 360]).range([5, -5]);
    d3.select("zoom-rect").remove();
    this.xCoord = clickX(d3.pointer(event)[0]);
    this.yCoord = clickY(d3.pointer(event)[1]);
  };

  getClickCoords = () => {
    return { x: this.xCoord, y: this.yCoord };
  };
}

export default ClickVectorEvent;
