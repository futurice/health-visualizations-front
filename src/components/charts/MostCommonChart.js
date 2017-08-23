import React from 'react';
import * as d3 from 'd3'
import '../../css/Chart.css';

class MostCommonChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawBarChart = this.drawBarChart.bind(this);
    this.doPlot = this.doPlot.bind(this);

    this.radius = 7;
    this.quant = 15;
    this.noOfTicks = 5;
    this.sunshineYellow = "#ffe638";
    this.purpley = "#9f6ce3";
    this.margin = { top: 20, right: 50, bottom: 10, left: 120 };
    this.xScale = undefined;
    this.yScale = undefined;
    this.chartContainerId = "most-common-container-" + this.props.resource;
  }

  handleClick = (e) => { 
    this.props.onClick(e.Name);
    d3.selectAll(".tooltip").remove();
  };

  drawBarChart(data) {

    let dataArray = [];

    for (let i = 0; i < d3.keys(data).length; i++) {
      let object = {
        "Name": "",
        "count": 0
      };
      object.Name = data[i][0];
      object.count = data[i][1];
      dataArray.push(object);
    }

    this.xScale = d3.scaleLinear().range([0, this.width - this.margin.right - this.margin.left]).domain([0, Math.ceil(d3.max(dataArray, (d) => d["count"]))]);
    this.yScale = d3.scaleLinear().range([0, this.height - this.margin.bottom - this.margin.top]).domain([0, this.quant]);

    for (var k = 0; k <= this.noOfTicks; k++) {
      let steps = (Math.ceil(d3.max(dataArray, (d) => d["count"]) / 1000) * 1000) / this.noOfTicks;

      this.svg.append("line")
        .attr("class", "xAxes")
        .attr("x1", this.xScale(steps * k))
        .attr("y1", -15)
        .attr("x2", this.xScale(steps * k))
        .attr("y2", this.height - this.margin.bottom - this.margin.top)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);

      this.svg.append("text")
        .attr("class", "xAxesLabels")
        .text(steps * k)
        .attr("y", this.height - this.margin.bottom - this.margin.top)
        .attr("x", this.xScale(steps * k) - 3)
        .attr("text-anchor", "end")
        .attr("font-size", 12)
        .attr("fill", "#fff")
        .attr("font-family", "Futurice")
        .attr("opacity", 1);
    }

    let tempData = dataArray.filter((d, i) => i < this.quant);

    this.svg.selectAll(".labels")
      .data(tempData)
      .enter()
      .append("text")
      .attr("class", "size-14")
      .attr("x", this.xScale(0) - 5)
      .attr("y", (d, i) => this.yScale(i) + 11)
      .attr("opacity", 0)
      .attr("text-anchor", "end")
      .attr("font-size", 12)
      .attr("fill", "#fff")
      .attr("font-family", "Futurice")
      .on("mouseover", (d, index, all) => {
        d3.select(all[index])
          .transition(200)
          .style('fill', this.purpley)
      })
      .on("mouseout", (d, index, all) => {
        d3.select(all[index])
          .transition(200)
          .style('fill', 'white')
      })
      .text((d) => d.Name)
      .style("cursor", "pointer")
      .on("click", this.handleClick)
      .transition()
      .duration(500)
      .attr("opacity", 1);

    this.svg.selectAll(".bars")
      .data(tempData)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("x", this.xScale(0))
      .attr("y", (d, i) => this.yScale(i))
      .attr("width", (d, i) => this.xScale(d.count))
      .attr("height", 15)
      .attr("stroke", this.sunshineYellow)
      .attr("fill", (this.props.resource === "drugs" ? this.sunshineYellow : "#d8d8d8"))
      .attr("fill-opacity", 0.6)
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("click", this.handleClick)
      .on("mouseover", (d, index, all) => {
        d3.select(all[index])
          .transition()
          .duration(200)
          .attr("stroke-width", 3);
        this.div.transition()
          .duration(200)
          .style("opacity", 1);
        this.div.html("Count: <span style='font-weight:bold'>" + d["count"] + "</span>")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mousemove", (d) => {
        this.div.style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", (d, index, all) => {
        d3.select(all[index])
          .transition()
          .duration(200)
          .attr("stroke-width", 1);
        this.div.transition()
          .duration(250)
          .style("opacity", 0);
      })
      .transition()
      .duration(500);

    this.forceUpdate();
  }

  doPlot() {
    let data = this.props.data;

    this.setState({
      data
    }, () => {

      this.width = document.getElementById(this.props.resource + "-chart").clientWidth;//+ this.margin.left;
      this.height = 500;

      d3.select("#" + this.chartContainerId).html('');

      this.div = d3.select(".most-common-container").append("div")
        .attr("class", "most-common-tooltip tooltip")
        .style("opacity", 0);

      let mapSVG = d3
        .select("#" + this.chartContainerId)
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("display", "block")
        .style("margin", "0 auto")
        .attr('class', 'svg-map');

      this.svg = mapSVG.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      this.drawBarChart(data);
    });
  }

  componentWillMount() {
    this.doPlot()
  }

  componentWillReceiveProps(nextProps) {
    this.doPlot()
  }

  render() {
    return (
      <div>
        <h4 className="heading-4"> Most common {this.props.resource} </h4>
        <p className="body-text is-centered"> Count </p>
        <div id={this.chartContainerId} className='chart-container'>

        </div>
      </div>
    )
  }
}

export default MostCommonChart;
