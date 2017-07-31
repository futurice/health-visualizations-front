import React, { Component } from 'react';
import QueryForm from './QueryForm';
import '../css/Search.css';
import AssociatedChart from './AssociatedChart';

export default class Search extends Component {
  render() {
    return (
      <div className="search-page">
        <div className="search-box">
          <h1 className="search-heading" > Nettipuoskari </h1>
          <QueryForm 
          
          />
        </div>

      <div className="first-result">
        <div className="first-result-left">
          <p className="result"> Search result </p>
          <h3 className="keyword"> {this.props.match.params.keyword} </h3> 
          <p className="body-text is-tight " >100% of total posts</p>
          <p className="body-text is-tight" > 26,000 posts </p>
          <p className="list-of-bucket body-text"> List of terms we think makes {this.props.match.params.keyword} </p>

          <div className="line-separator"></div>

          <h5 className="heading-5"> Headline </h5>

          <p className="body-text"> About the metric and data analysis
 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
          </p>
        </div>

        <div className="chart">
          <AssociatedChart

          />
        </div>
      </div>
      </div>
    );
  }
}