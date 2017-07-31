import React, { Component } from 'react';
import QueryForm from './QueryForm';
import '../css/Search.css';
import AssociatedChart from './AssociatedChart';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import { Link } from 'react-router-dom';

export default class Search extends Component {
  render() {
    return (
      <div className="search-page">
        <div className="search-box">
          <Link to="/" className="search-heading" > Nettipuoskari </Link>
          <QueryForm 
            value={ this.props.match.params.keyword }
          />
        </div>

        <div className="association-result">
          <div className="association-result-left">
            <p className="result"> Search result </p>
            <h3 className="keyword"> {this.props.match.params.keyword} </h3> 
            <p className="body-text is-tight " >100% of total posts</p>
            <p className="body-text is-tight" > 26,000 posts </p>
            <p className="list-of-bucket body-text"> List of terms we think makes {this.props.match.params.keyword} </p>

            <div className="line-separator"></div>

            <ChartSideBar
              heading="Heading"
              bodyText="About the metric and data analysis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud"
              includeSlider={true}
            />
          </div>

          <div className="chart">
            <AssociatedChart

            />
            <p className="minor-margin really-small-text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus dolor eros, eu bibendum felis tristique non. </p>
          </div>
        </div>
        
        <br />
        <div className="line-separator"></div>
        
        <div className="association-result">
          <div className="association-result-left">
            
            <ChartSideBar
              heading="Heading"
              bodyText="About the metric and data analysis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud"
              includeSlider={true}
            />

            <br />
    
            <p className="really-small-text">This is not medical advice or a best practice example to follow </p>

          </div>
          <div className="chart">
            <AssociatedChart

            />
            <p className="minor-margin really-small-text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus dolor eros, eu bibendum felis tristique non. </p>
          </div>
        </div>

        <div className="line-separator"></div>

        <DosageChart
          isDrug={true}
        />

        <div className="line-separator"> </div>
      </div>
    );
  }
}