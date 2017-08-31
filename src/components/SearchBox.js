import React, { Component } from 'react';
import QueryForm from './QueryForm';
import { Link } from 'react-router-dom';
import '../css/SearchBox.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';


export default class SearchBox extends Component {

  render() {
    if (this.props.notVisible) {
      return null;
    }
    return (
      <StickyHeader
        header={
          <div className="search-box">
            <Link to="/" className="search-heading text-link" > Lääketutka </Link>
            <QueryForm
              value={this.props.match.params.keyword}
              history={this.props.history}
              updateKeyword={this.props.updateKeyword}
              findByKeyword={this.props.findByKeyword}
            />
          </div>
        }
      >
      </StickyHeader>


    )
  }
}