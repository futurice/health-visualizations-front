import React, { Component } from 'react';
import warning from '../css/warning.svg';
import '../css/WarningText.css';
import '../css/FontStyles.css';

export default class WarningText extends Component {

  render() {
    return (
      <div className="minor-margin warning-container">
        <img src={warning} className="warning" alt="warning" />
        <span className="warning-text size-13 whiteish">This is not medical advice, the data only reflects what people talk about.</span>
      </div>
    );
  }
}
