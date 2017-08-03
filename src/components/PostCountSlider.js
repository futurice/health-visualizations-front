import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import _ from 'lodash';

export default class PostCountSlider extends Component {

  constructor(props) {
    super(props);    

    this.onChange = _.debounce(e => {
      this.props.onChange(e);
    }, 200);
  }

  render() {
    return (
      <div className="post-count-slider">
        <Slider
          defaultValue={30}
          step={1}
          min={0}
          max={50}
          onChange={this.onChange}
          handleStyle={{
            margin: 'auto auto',
            borderColor: 'var(--purpley)',
            height: 28,
            width: 28,
            marginLeft: -14,
            marginTop: -12,
            backgroundColor: 'var(--purpley)',
          }}
        />
      </div>
    );
  }

}