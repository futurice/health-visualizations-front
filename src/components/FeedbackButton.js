import React, { Component } from 'react';
import '../css/FeedbackButton.css';

export default class FeedbackButton extends Component {

  constructor(props) {
    super(props);
    
    const keyword = this.props.keyword || "";
    this.formLink = `https://docs.google.com/forms/d/e/1FAIpQLSdUNP2r2h5VO2DnnYNpB9D3elPX7F2vfxxKyOfLEnSacPEKUw/viewform?entry.1364640715=${keyword}&entry.2008619622`;
  }

  render() {
    return (
      <a href={this.formLink} className="feedback-button">Send us feedback</a>
    );
  }
}
