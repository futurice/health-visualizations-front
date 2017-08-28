import React, { Component } from 'react';
import PostCountSlider from './PostCountSlider';
import '../css/ChartSideBar.css';

export default class ChartSideBar extends Component {

  constructor(props) {
    super(props);
    this.isSliderVisible = this.isSliderVisible.bind(this);
    this.setSliderVisible = this.setSliderVisible.bind(this);
  }

  isSliderVisible() {
    return localStorage.getItem(this.props.sliderType) !== null;
  }

  setSliderVisible() {
    this.props.onChangeSlider(this.props.sliderType, 30);
    this.setState(this.state);
  }

  render() {
    if (this.props.sliderType === "noSlider") {
      return (
        <div className="chart-side-bar">
          { this.props.bodyText }
        </div>

      )
    }

    if (!this.isSliderVisible()) {
      return (
        <div className="chart-side-bar">
          { this.props.bodyText }
          <a onClick={this.setSliderVisible} className="text-link size-14">Sample size filtering</a>
        </div>

      )
    }

    return (
      <div className="chart-side-bar">
 s
        { this.props.bodyText }


        <div className="size-14 whiteish">
          Move slider to change the minimum sample size used in filtering.
        </div>

        <div className="slider-container">

          <PostCountSlider
            value={this.props.getSliderVal(this.props.sliderType)}
            className="slider-slider"
            onChange={(e) => this.props.onChangeSlider(this.props.sliderType, e)}
          />
          <div className="slider-text-top-left size-14 whiteish">
            More results
          </div>
          <div className="slider-text-top-right size-14 whiteish">
            More confidence
          </div>
        </div>
      </div>
    );
  }
}
