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
              value={this.props.value}
              className="slider-slider"
              onChange={this.props.sliderOnChange}
            />
            <div className="slider-text-top-left size-14 whiteish">
              More results
            </div>
            <div className="slider-text-top-right size-14 whiteish">
              More confidence
            </div>
          </div>
            }
        {this.props.includeSlider}
      </div>
    );
  }
}
