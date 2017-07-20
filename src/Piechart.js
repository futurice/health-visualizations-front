import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { parseDosages } from './util.js';

export default class Piechart extends React.Component {
  render() {
    
    let options = {
      title: this.props.title,
      sliceVisibilityThreshold: 1/50
    };

    if (!this.props.data) {
      return
    }

    let data = parseDosages(this.props.data);

    return (
      <div className={'chart-container'}>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          graph_id="ScatterChart"
          width="50%"
          height={this.props.height || "500px"} 
          legend_toggle
        />
      </div>
    );
  }
}