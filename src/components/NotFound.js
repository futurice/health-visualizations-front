import React, { Component } from 'react';
import SearchBox from './SearchBox';
import '../css/NotFound.css';
import FeedbackButton from './FeedbackButton';

export default class NotFound extends Component {

  render() {
    const keyword = this.props.match.params.keyword;

    return (
      <div className="not-found">
        
        <SearchBox
          history={this.props.history}
          match={this.props.match}
        />
        <br />
        <h1 className="minor-margin heading-1">_result not found</h1>

        <p className="body-text">
          This might be either because it isn’t mentioned in the data, or (more likely) we did not recognize it as a drug or symptom. <a href="#"> Our blog post </a> explains how we recognize drugs and symptoms. If you think <b>{ keyword }</b> should be searchable, please click the feedback button below.
        </p>
        <FeedbackButton 
          keyword={keyword}
        />
      </div>
    )
  }
}