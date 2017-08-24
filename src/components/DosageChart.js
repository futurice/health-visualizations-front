import React, { Component } from 'react';
import '../css/DosageChart.css';
import ChartSideBar from './ChartSideBar';
import BubbleChart from './charts/BubbleChart';
import WarningText from './WarningText';

export default class DosageChart extends Component {

  render() {
    if (!this.props.isDrug) {
      return <div> </div>;
    }
    return (
      <div className="association-result">
        <div className="association-result-left">

          <ChartSideBar
            bodyText={<p className="size-14">This plot describes which dosages are commonly mentioned along with the searched keyword. We assume that dosages mentioned inside posts are related to the closest drug mentioned within the post. We only find dosages mentioned as explicit quantities (e.g. “600mg”). Units other than g or mg are not recognized.</p>}
            includeSlider={false}
          />

        </div>
        <div id="bubbles-chart" className="chart">
          <BubbleChart
            data={this.props.data}
            keyword={this.props.keyword}
            onClick={this.props.onClick}
          />

        </div>
      </div>
    );
  }
}
