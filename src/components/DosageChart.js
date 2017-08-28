import React, { Component } from 'react';
import '../css/DosageChart.css';
import ChartSideBar from './ChartSideBar';
import BubbleChart from './charts/BubbleChart';
import WarningText from './WarningText';
import _ from 'lodash';

export default class DosageChart extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    if (!this.props.isDrug) {
      return <div> </div>;
    }
    return (
      <div ref={(e) => this.plotContainer = e} className="association-result">
        <div className="association-result-left">

          <ChartSideBar
            bodyText={<p className="size-14">This plot describes which dosages are commonly mentioned along with the searched keyword. We assume that dosages mentioned inside posts are related to the closest drug mentioned within the post. We only find dosages mentioned as explicit quantities (e.g. “600mg”). Units other than g or mg are not recognized.</p>}
            sliderType="noSlider"
          />

        </div>
        <div ref={e => this.bubbleChartContainer = e} id="bubbles-chart" className="chart">
          <BubbleChart
            data={this.props.data}
            keyword={this.props.keyword}
            onClick={this.props.onClick}
            width={this.props.width}
          />

        </div>
      </div>
    );
  }
}
