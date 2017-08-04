import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import _ from 'lodash';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};


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
          handle={handle} 
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