import React, { Component } from 'react';
import SearchBox from './SearchBox';
import '../css/NotFound.css';

export default class NotFound extends Component {

  render() {
    return (
      <div className="not-found">
        <SearchBox
          history={this.props.history}
          match={this.props.match}
        />

        <h1 className="minor-margin heading-1">_result not found</h1>

        <p className="body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum tempus dolor eros, eu bibendum felis tristique non. 
          Nullam laoreet orci eget efficitur vehicula. 
          Praesent risus ipsum, maximus at tristique luctus, pellentesque ut nunc.
          Phasellus fermentum et nulla faucibus faucibus. 
          Quisque efficitur, ligula a egestas eleifend, justo leo dapibus quam, non eleifend sapien neque consectetur ipsum. 
          Nunc molestie elit quis eleifend egestas.
        </p>

      </div>
    )
  }
}