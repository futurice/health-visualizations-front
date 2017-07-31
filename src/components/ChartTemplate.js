import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { parse } from './util.js';

export default class ChartTemplate extends React.Component {
  
  constructor(props) {
    super(props);

    this.chartEvents = [
      {
        eventName: 'select',
        ...this.props.chartClicked && {callback: this.props.chartClicked} // TODO fix
      }
    ]
  }

  render() {  
    let options = {
      title: this.props.title,
      sliceVisibilityThreshold: 1/50,
      tooltip: {isHtml: true}
    };

    if (!this.props.data) {
      return
    }

    let labels = this.props.labels;
    let data = this.props.data;

    return (
        <Chart
          chartType={this.props.chartType || "PieChart"}
          data={data}
          options={options}
          graph_id={this.props.graph_id}
          width="100%"
          height={this.props.height || "700px"}
          chartEvents={this.chartEvents}
        />
    );
  }
}