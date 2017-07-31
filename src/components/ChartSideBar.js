import React, { Component } from 'react';
import PostCountSlider from './PostCountSlider';

export default class ChartSideBar extends Component {

  render() {
    return (
      <div className="chart-side-bar">
        <h5 className="heading-5"> { this.props.heading } </h5>

        <p className="body-text"> { this.props.bodyText }
            </p>

        {this.props.includeSlider &&
          <div className="slider-container">
            <p className="body-text" > Minimum post count </p>
            <PostCountSlider

            />
            <p className="minor-margin really-small-text"> Move slider to change minimum post count required </p>
          </div>
            }
      </div>
    );
  }
}
