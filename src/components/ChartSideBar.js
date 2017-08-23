import React, { Component } from 'react';
import PostCountSlider from './PostCountSlider';
import '../css/ChartSideBar.css';

export default class ChartSideBar extends Component {

  render() {
    return (
      <div className="chart-side-bar">
 
        { this.props.bodyText }
        
        {this.props.includeSlider &&
          <div className="slider-container">

            <PostCountSlider
              className="slider-slider"
              onChange={this.props.sliderOnChange}
            />
            <div className="slider-text-top-left">
              More results
            </div>
            <div className="slider-text-top-right">
              More confidence
            </div>
          </div>
            }
        {this.props.includeSlider}
      </div>
    );
  }
}
