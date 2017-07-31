import React, { Component } from 'react';
import QueryForm from './QueryForm';
import '../css/Search.css';

export default class Search extends Component {
  render() {
    return (
      <div className="search-page">
        <div className="search-box">
          <h1 className="search-heading" > Nettipuoskari </h1>
          <QueryForm 
          
          />
        </div>
      </div>
    );
  }
}