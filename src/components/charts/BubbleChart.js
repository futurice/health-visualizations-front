import React from 'react';
import * as d3 from 'd3'
import '../../css/BubbleChart.css';

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);

    this.doPlot = this.doPlot.bind(this);
    this.drawBubbles = this.drawBubbles.bind(this);

    this.sunshineYellow = "#ffe638";
    this.margin = { top: 20, right: 10, bottom: 10, left: 90 };
    this.xScale = undefined;
    this.yScale = undefined;
    this.chartContainerId = "chart-container-bubbles";
  }

  /* Remove all tooltip divs after switching page */
  componentWillUnmount() {
    d3.selectAll(".tooltip").remove()
  }

  doPlot() {
    let data = this.props.data;

    this.setState({
      data
    }, () => {

      this.width = document.getElementById("bubbles-chart").clientHeight;
      this.height = document.getElementById("bubbles-chart").clientHeight;

      this.div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      this.svg = d3
        .select("#" + this.chartContainerId)
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("display", "block")
        .style("margin", "0 auto")
        .attr('class', 'svg-map');

      //.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.drawBubbles(this.props.data);
    });
  }

  drawBubbles(data) {
    let dataArray = [];

    let svg = this.svg;

    for (let i = 0; i < d3.keys(data).length; i++) {
      let object = {
        "Dosage": "",
        "count": 0
      };
      object.Dosage = d3.keys(data)[i];
      object.count = data[d3.keys(data)[i]];
      dataArray.push(object);
    }
    dataArray.sort((x, y) => d3.descending(x["count"], y["count"]));
    let dataset = { "children": dataArray }

    let bubble = d3.pack()
      .size([this.height, this.height])
      .padding(5);
    let nodes = d3.hierarchy(dataset)
      .sum((d) => d.count);

    let node = svg.selectAll(".node")
      .data(bubble(nodes).children)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

    node.append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", this.sunshineYellow)
      .attr("fill-opacity", 0.6)
      .attr("stroke", this.sunshineYellow)
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("click", this.props.onClick)
      .on("mouseover", (d) => {
        this.div.transition()
          .duration(200)
          .style("opacity", .9);
        this.div.html("Dosage: <span style='font-weight:bold'>" + d.data.Dosage + "mg</span><br/>Count: <span style='font-weight:bold'>" + d.data.count + "</span>")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mousemove", (d) => {
        this.div.style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", (d) => {
        this.div.transition()
          .duration(250)
          .style("opacity", 0);
      });

    node.filter((d, i) => d.data.count >= 8)
      .append("text")
      .attr("x", 0)
      .attr("y", 5)
      .text((d) => d.data.Dosage + "mg")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("fill", "#fff")
      .attr("font-family", "Futurice")
  }

  componentWillMount() {
    this.doPlot()
  }

  render() {
    return (
      <div>
        <h4 className="heading-4"> Dosages associated with { this.props.keyword } </h4>
        <p className="body-text is-centered"> Count </p>
        <div id={this.chartContainerId} className='chart-container'>

        </div>
      </div>
    )
  }
}

export default BubbleChart;
