import React from 'react';
import * as d3 from 'd3'
import '../../css/BubbleChart.css';
import WarningText from "../WarningText";

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
    this.scalePlot = this.scalePlot.bind(this);
  }

  /* Remove all tooltip divs after switching page */
  componentWillUnmount() {
    d3.selectAll(".tooltip").remove()
  }

  doPlot() {
    let data = this.props.data;

    let size = 0, key;
    for (key in this.props.data) {
      size += 1
    }
    if (size === 0) {
      return;
    }

    this.setState({
      data
    }, () => {
      this.width = document.getElementById("bubbles-chart").clientWidth;
      this.height = document.getElementById("bubbles-chart").clientHeight;
      /*
      if (this.props.width) {
        this.width = this.props.width;
        this.height = this.props.width;
      }
      */
      this.width = Math.min(this.width, 480);
      this.height = Math.min(this.width, 480);

      if (!this.initialWidth) {
        this.initialWidth = 1.0 * this.width;
      }

      if (!this.div) {
        this.div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0); 
      }

      this.svg = d3
        .select("#" + this.chartContainerId)
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("display", "block")
        .style("margin", "0 auto")
        .attr('class', 'svg-map');
      
      this.drawBubbles(this.props.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width === this.props.width) {
      return;
    }    
    if (this.svg) {
      this.scalePlot();
    }
  }

  scalePlot() {      
    this.svg.remove();
    this.doPlot();
  }

  drawBubbles(data) {
    let dataArray = [];

    let svg = this.svg.append('g').attr('class','inside-circle');

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
      .on("mouseover", (d, index, all) => {
        d3.select(all[index])
          .transition()
          .duration(200)
          .attr('r', (d) => d.r + 5)
          .attr('stroke-width', 3)

        this.div.transition()
          .duration(200)
          .style("opacity", .9);
        this.div.html("Dosage: <span style='font-weight:bold'>" + d.data.Dosage + "mg</span><br/>Click to see <span style='font-weight:bold'>" + d.data.count + "</span> posts")
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
          .attr('r', (d) => d.r)
          .attr('stroke-width', 1)

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
    this.doPlot();
  }

  render() {
    let size = 0, key;
    for (key in this.props.data) {
      size += 1
    }
    if (size === 0) {
      return (
        <div className="no-results-found-container">
          <h4 className="heading-4"> Dosages associated with { this.props.keyword } </h4>
          <p className="no-results-found centered size-16 white monospaced">
            NO RESULTS FOUND
          </p>
        </div>
      )
    }

    return (
      <div>
        <h4 className="heading-4"> Dosages associated with { this.props.keyword } </h4>
        <p className="body-text is-centered"> Count </p>
        <div id={this.chartContainerId} className='chart-container'>

        </div>
        <WarningText />
      </div>

    )
  }
}

export default BubbleChart;
