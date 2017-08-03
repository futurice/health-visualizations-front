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
            <p className="body-text" > Minimum post count </p>
            <PostCountSlider
              onChange={this.props.sliderOnChange}
            />
            <p className="minor-margin really-small-text"> Move slider to change minimum post count required </p>
          </div>
            }
      </div>
    );
  }
}
