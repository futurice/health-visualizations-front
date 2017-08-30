import React, { Component } from 'react';
import PostCountSlider from './PostCountSlider';
import '../css/ChartSideBar.css';
import { Link } from 'react-router-dom';

const bodyText = 
<p className="size-14">
  Relevance is a metric that we use to show the strongest connections.
  Relevance is <i>not</i> purely a measure of how often each term appears with the search term.
  It also takes into account how often each term appears in general.
  Click <Link to="/faq">here</Link> to learn more about how we calculate it.
</p>;

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
    this.props.onChangeSlider(this.props.sliderType, 30, false);
    this.setState(this.state);
  }

  render() {
    if (this.props.sliderType === "noSlider") {
      return (
        <div className="chart-side-bar">
           { bodyText }
        </div>
      )
    }

    if (!this.isSliderVisible()) {
      return (
        <div className="chart-side-bar">
           { bodyText }
          <a onClick={this.setSliderVisible} className="text-link size-14">Sample size filtering</a>
        </div>

      )
    }

    return (
      <div className="chart-side-bar">

        { bodyText }

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
