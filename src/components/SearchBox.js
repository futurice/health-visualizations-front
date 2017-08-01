import React, { Component } from 'react';
import QueryForm from './QueryForm';
import { Link } from 'react-router-dom';

export default class SearchBox extends Component {

  render() {
    return (
      <div className="search-box">
        <Link to="/" className="search-heading" > Nettipuoskari </Link>
        <QueryForm
          value={this.props.match.params.keyword}
          history={this.props.history}
        />
      </div>
    )
  }
}