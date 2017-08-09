import React, { Component } from 'react';
import PostCountSlider from './PostCountSlider';
import '../css/ChartSideBar.css';

export default class ChartSideBar extends Component {

  render() {
    return (
      <div className="chart-side-bar">

        <p className="body-text"> 
          { this.props.bodyText }
        </p>

        {this.props.includeSlider &&
          <div className="slider-container">
            <PostCountSlider
              onChange={this.props.sliderOnChange}
            />
            <p className="move-slider really-small-text "> Move slider to change minimum post count required </p>
          </div>
            }
      </div>
    );
  }
}
