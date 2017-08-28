import React from 'react';
import * as d3 from 'd3'
import '../../css/Chart.css';
import _ from 'lodash';
import WarningText from "../WarningText";
import '../../css/Associated.css';

class AssociatedChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawDotPlot = this.drawDotPlot.bind(this);
    this.doPlot = this.doPlot.bind(this);

    this.radius = 7;
    this.quant = 15;
    this.noOfTicks = 5;
    this.sunshineYellow = "#ffe638";
    this.purpley = "#9f6ce3";
    this.margin = { top: 20, right: 0, bottom: 10, left: 150 };
    this.xScale = undefined;
    this.yScale = undefined;
    this.chartContainerId = "chart-container-" + this.props.resource;
  }

  drawDotPlot(data) {

    let dataArray = [];

    for (let i = 0; i < d3.keys(data).length; i++) {
      let object = {
        "MedicineName": "",
        "count": 0,
        "value": 0
      };
      object.MedicineName = d3.keys(data)[i];
      object.count = data[d3.keys(data)[i]]["count"];
      object["value"] = data[d3.keys(data)[i]]["value"];
      dataArray.push(object);
    }

    dataArray.sort((x, y) => d3.descending(x["value"], y["value"]));

    this.xScale = d3.scaleLinear().range([0, this.width - this.margin.right - this.margin.left]).domain([0, Math.ceil(d3.max(dataArray, (d) => d["value"]))]);

    this.yScale = d3.scaleLinear().range([0, this.height - this.margin.bottom - this.margin.top]).domain([0, this.quant]);

    let countLimit = this.props.minCount;

    for (var k = 0; k <= this.noOfTicks; k++) {
      let steps = (Math.ceil(d3.max(dataArray, (d) => d["value"]) / 1000) * 1000) / this.noOfTicks;
      this.svg.append("line")
        .attr("class", "xAxes")
        .attr("x1", this.xScale(steps * k))
        .attr("y1", -15)
        .attr("x2", this.xScale(steps * k))
        .attr("y2", this.height - this.margin.bottom - this.margin.top)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);

      if (this.width >= 330) {
        this.svg.append("text")
          .attr("class", "xAxesLabels")
          .text(steps * k)
          .attr("y", this.height - this.margin.bottom - this.margin.top)
          .attr("x", this.xScale(steps * k) - 3)
          .attr("text-anchor", "end")
          .attr("font-size", 12)
          .attr("fill", "#fff")
          .attr("font-family", "Futurice")
          .attr("opacity", 1)
      }
    }

    let tempData = dataArray.filter((d, i) => d["count"] >= countLimit).sort((x, y) => d3.descending(x["value"], y["value"])).filter((d, i) => i < this.quant);

    this.svg.selectAll(".dots")
      .data(tempData)
      .enter()
      .append("circle")
      .attr("class", "dots")
      .attr("r", this.radius)
      .attr("fill", this.sunshineYellow)
      .attr("cx", 0)
      .attr("cy", (d, i) => this.yScale(i))
      .attr("fill-opacity", 0.6)
      .attr("stroke", this.sunshineYellow)
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("click", this.props.onClickBubble)
      .on("mouseover", (d, index, all) => {
        d3.select(all[index])
          .transition()
          .duration(200)
          .attr('fill-opacity', 1)
          .attr('r', this.radius + 5);

        this.div.transition()
          .duration(200)
          .style("opacity", 1);
        this.div.html("Count: <span style='font-weight:bold'>" + d["count"] + "</span><br/>" +
          "Relevance: <span style='font-weight:bold'>" + d["value"].toFixed(1) + "</span>" +
          "<br/><b>Click to see posts</b>")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mousemove", (d) => {
        this.div.style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", (d, index, all) => {
        this.div.transition()
          .duration(250)
          .style("opacity", 0);
        d3.select(all[index])
          .transition()
          .duration(200)
          .attr('r', this.radius)
          .attr('fill-opacity', 0.6);
      })
      .transition()
      .duration(500)
      .attr("cx", (d, i) => this.xScale(d["value"]));



    this.svg.selectAll(".labels")
      .data(tempData)
      .enter()
      .append("text")
      .attr("class", "size-13 labels")
      .attr("x", this.xScale(0) - 5)
      .attr("y", (d, i) => this.yScale(i) + 4)
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
      .style("cursor", "pointer")
      .on("click", this.props.onClickLabel)
      .text((d) => d.MedicineName)
      .transition()
      .duration(500)
      .attr("opacity", 1);


    this.svg.selectAll(".dotsLine")
      .data(tempData)
      .enter()
      .append("line")
      .attr("class", "dotsLine")
      .attr("x1", this.xScale(0))
      .attr("y1", (d, i) => this.yScale(i))
      .attr("x2", this.xScale(0))
      .attr("y2", (d, i) => this.yScale(i))
      .attr("stroke", (this.props.resource === "drugs" ? this.sunshineYellow : "#d8d8d8"))
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .on("click", this.props.onClickBubble)
      .transition()
      .duration(500)
      .attr("x2", (d, i) => this.xScale(d["value"]) - 7);

    this.forceUpdate();
  }

  doPlot() {
    let data = this.props.data;

    this.setState({
      data
    }, () => {

      //this.width = document.getElementById("#"+this.chartContainerId).clientWidth;

      if (this.props.width) this.width = this.props.width;


      this.height = 500;
      if (this.width <= 480) {
        this.height = 400;
      }

      d3.select("#" + this.chartContainerId).html('');
      if (!this.div) {
        this.div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
      }

      if (this.svg) {
        this.svg.remove();
      }

      if (this.tooltip) {
        this.tooltip.remove();
      }

      let mapSVG = d3
        .select("#" + this.chartContainerId)
        .append('svg')
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("display", "block")
        .style("margin", "0 auto")

      let marginRight = this.margin.right, marginLeft = this.margin.left

      marginRight = (75 * this.width) / (582 * 1.0);
      this.margin.right = marginRight;

      this.svg = mapSVG.append("g").attr("transform", "translate(" + marginLeft + "," + this.margin.top + ")");
      this.drawDotPlot(data);
    });
  }

  comonentWillMount() {
    this.doPlot();
  }

  componentWillReceiveProps(nextProps) {
    this.doPlot()
  }

  render() {
    let size = 0, key;
    for (key in this.props.data) {
      if (this.props.data[key].count >= this.props.minCount) {
        size += 1;
      }
    }
    if (size === 0) {
      return (
        <div className="no-results-found-container">
          <h4 className="heading-4"> {_.startCase(_.toLower(this.props.resource))} associated with {this.props.keyword} </h4>
          <p className="no-results-found centered size-16 white monospaced">
            NO RESULTS FOUND
          </p>
          <p className="centered size-14 white monospaced">
            Try adjusting the sample size filter
          </p>
        </div>
      )
    }
    return (
      <div className="associated-chart">
        <h4 className="heading-4"> {_.startCase(_.toLower(this.props.resource))} associated with {this.props.keyword} </h4>
        <p className="size-16 centered whiteish"> Relevance </p>
        <div id={this.chartContainerId} className='chart-container'>

        </div>
        <div className="size-13 centered whiteish top-margin">Click the bubbles to see the posts.</div>
        <WarningText />
      </div>
    )
  }
}

export default AssociatedChart;
