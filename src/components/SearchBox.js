import React, { Component } from 'react';
import QueryForm from './QueryForm';
import { Link } from 'react-router-dom';
import '../css/SearchBox.css';

export default class SearchBox extends Component {

  render() {
    return (
      <div className="search-box">
        <Link to="/" className="search-heading" > Nettipuoskari </Link>
        <QueryForm
          value={this.props.match.params.keyword}
          history={this.props.history}
          updateKeyword={this.props.updateKeyword}
          findByKeyword={this.props.findByKeyword}
        />
      </div>
    )
  }
}