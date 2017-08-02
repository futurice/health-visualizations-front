import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class PostCountSlider extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div className="post-count-slider">
        <Slider
          defaultValue={30}
          step={1}
          min={0}
          max={50}
          onChange={this.props.onChange}
          handleStyle={{
            borderColor: 'var(--purpley)',
            height: '1rem',
            width: '1rem',
            backgroundColor: 'var(--purpley)',
          }}
        />
      </div>
    );
  }

}