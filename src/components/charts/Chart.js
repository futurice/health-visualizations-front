import React from 'react';
import * as d3 from 'd3'
import '../../css/Chart.css';
import { generateUrl } from '../../util.js';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.drawDotPlot = this.drawDotPlot.bind(this);
    this.doPlot = this.doPlot.bind(this);

    this.radius = 7;
    this.quant = 15;
    this.noOfTicks = 5;
    this.sunshineYellow = "#ffe638";
    this.margin = { top: 20, right: 10, bottom: 10, left: 125 };
    this.name = "Baruna";
    this.xScale = undefined;
    this.yScale = undefined;
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
        .attr("opacity", 0.5)

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

    let tempData = dataArray.filter((d, i) => d["count"] >= countLimit).sort((x, y) => d3.descending(x["value"], y["value"])).filter((d, i) => i < this.quant);

    this.svg.selectAll(".dots")
      .data(tempData)
      .enter()
      .append("circle")
      .attr("class", "dots")
      .attr("cx", (d, i) => this.xScale(d["value"]))
      .attr("cy", (d, i) => this.yScale(i))
      .attr("r", this.radius)
      .attr("fill", this.sunshineYellow)
      .attr("fill-opacity", 0.6)
      .attr("stroke", this.sunshineYellow)
      .attr("stroke-width", 1)
      .on("mouseover", (d) => {

        this.div.transition()
          .duration(200)
          .style("opacity", .9);
        this.div.html("Count: <span style='font-weight:bold'>" + d["count"] + "</span><br/>" + "Value: <span style='font-weight:bold'>" + d["value"].toFixed(1) + "</span>")
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

    this.svg.selectAll(".labels")
      .data(tempData)
      .enter()
      .append("text")
      .attr("class", "labels")
      .attr("x", this.xScale(0) - 5)
      .attr("y", (d, i) => this.yScale(i) + 4)
      .attr("text-anchor", "end")
      .attr("font-size", 12)
      .attr("fill", "#fff")
      .attr("font-family", "Futurice")
      .text((d) => d.MedicineName);

    this.svg.selectAll(".dotsLine")
      .data(tempData)
      .enter()
      .append("line")
      .attr("class", "dotsLine")
      .attr("x1", this.xScale(0))
      .attr("y1", (d, i) => this.yScale(i))
      .attr("x2", (d, i) => this.xScale(d["value"]) - 7)
      .attr("y2", (d, i) => this.yScale(i))
      .attr("stroke", this.sunshineYellow)
      .attr("stroke-width", 3);

    this.forceUpdate();
  }

  componentWillReceiveProps() {
    //this.drawDotPlot(this.state.data.associated_drugs)
    this.setState(this.state)
  }

  doPlot() {

    let url = generateUrl(this.props.keyword);

    d3.json(url, (error, data) => {
      if (error) throw error;
      this.setState({
        data
      }, () => {
        this.width = document.getElementById("chart").clientWidth;
        this.height = 400; //document.getElementById("chart").clientHeight;

        d3.select('.chart-container').html('');

        let title = "Associated drugs mentioned with " + this.name;

        this.div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


        let mapSVG = d3
          .select('.chart-container')
          .append('svg')
          .attr('xmlns', 'http://www.w3.org/2000/svg')
          .attr("width", this.width)
          .attr("height", this.height)
          .attr('class', 'svg-map');

        this.svg = d3.selectAll("svg").append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.drawDotPlot(this.state.data.associated_drugs)
      });
    });

  }

  componentWillMount() {
    this.doPlot()
  }

  componentWillReceiveProps() {
    this.doPlot()
  }

  render() {
    return (
      <div>
        <h4 className="heading-4">{this.props.heading}</h4>
        <p className="body-text is-centered"> Relevance factor </p>
        <div id='chart-container' className='chart-container'>

        </div>
      </div>
    )
  }
}

export default Chart;
