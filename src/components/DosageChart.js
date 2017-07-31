import React, { Component } from 'react';
import '../css/DosageChart.css';
import ChartSideBar from './ChartSideBar';
import AssociatedChart from './AssociatedChart';

export default class DosageChart extends Component {

  render() {

    if (!this.props.isDrug) {
        return <div> </div>;
    }

    return (
      <div className="association-result">
          <div className="association-result-left">
            
            <ChartSideBar
              heading="Heading"
              bodyText="About the metric and data analysis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud"
              includeSlider={false}
            />

            <br />
    
            <p className="really-small-text">This is not medical advice or a best practice example to follow </p>

          </div>
          <div className="chart">
            <AssociatedChart

            />
            <p className="minor-margin really-small-text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus dolor eros, eu bibendum felis tristique non. </p>
          </div>
        </div>
    );
  }
}
