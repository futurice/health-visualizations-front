import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { parse } from './util.js';

export default class ChartTemplate extends React.Component {
  
  render() {  
    let options = {
      title: this.props.title,
      sliceVisibilityThreshold: 1/50
    };

    if (!this.props.data) {
      return
    }
    let labels = this.props.labels;
    let data = parse(this.props.data, labels, this.props.slice || this.props.data.length);

    return (
        <Chart
          chartType={this.props.chartType || "PieChart"}
          data={data}
          options={options}
          graph_id={this.props.graph_id}
          width="500px"
          height={this.props.height || "700px"} 
          legend_toggle
        />
    );
  }
}