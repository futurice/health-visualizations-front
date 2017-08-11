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
              onChange={this.props.sliderOnChange}
            />
            <p className="move-slider really-small-text "> Move slider to change the minimum sample size </p>
          </div>
            }
      </div>
    );
  }
}
