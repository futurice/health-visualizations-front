import React, { Component } from 'react';
import '../css/Search.css';
import AssociatedChart from './AssociatedChart';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import { Redirect } from 'react-router-dom';
import SearchBox from './SearchBox';
import { getByKeyword } from '../util';
import QuoteModal from './QuoteModal';
import Chart from './charts/Chart';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: this.props.match.params.keyword,
      notFound: false,
      loading: true,
      drugsSliderValue: 30,
      symptomsSliderValue: 30
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
    this.findByKeyword = this.findByKeyword.bind(this);
    this.drugsSliderOnChange = this.drugsSliderOnChange.bind(this);
    this.symptomsSliderOnChange = this.symptomsSliderOnChange.bind(this);
  }

  drugsSliderOnChange(e) {
    this.setState({
      drugsSliderValue: e
    });
  }

  symptomsSliderOnChange(e) {
    this.setState({
      symptomsSliderValue: e
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }

  updateKeyword(keyword) {
    this.setState({
      keyword
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  componentWillMount() {
    this.findByKeyword();
  }

  findByKeyword() {
    this.setState({
      loading: true
    }, () => {
      getByKeyword(this.state.keyword).then((response) => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 404) {
            this.props.history.push("/not_found");
          }
        })
    });
  }

  render() {
    if (this.state.notFound) {
      return <Redirect to="/not_found" />;
    }

    if (this.state.loading) {
      return <p className="loading"> Loading... </p>;
    }

    return (
      <div ref="search" className="search-page">
        <QuoteModal
          isOpen={this.state.modalIsOpen}
          data={this.state.data.basket}
          closeModal={this.closeModal}
          heading="Basket"
        />
        <SearchBox
          history={this.props.history}
          match={this.props.match}
          updateKeyword={this.updateKeyword}
          findByKeyword={this.findByKeyword}
        />

        /* Drugs association result */
        <div className="association-result">
          <div className="association-result-left">
            <p className="result"> Search result </p>
            <h3 className="keyword"> {this.state.keyword} </h3>
            <p className="body-text is-tight" > {this.state.data.postCount} posts </p>
            <a onClick={this.openModal} className="list-of-bucket body-text"> List of terms we think makes {this.state.keyword} </a>

            <div className="line-separator"></div>

            <ChartSideBar
              heading="Heading"
              bodyText="About the metric and data analysis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud"
              includeSlider={true}
              sliderOnChange={this.drugsSliderOnChange}
            />
          </div>

          <div id="drugs-chart" className="chart">
            <Chart
              keyword={this.state.keyword}
              minCount={this.state.drugsSliderValue}
              data={this.state.data.associated_drugs}
              resource="drugs"
            />
            <p className="minor-margin really-small-text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus dolor eros, eu bibendum felis tristique non. </p>
          </div>
        </div>

        <br />
        <div className="line-separator"></div>

        /* Symptoms association result */
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              heading="Heading"
              bodyText="About the metric and data analysis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud"
              includeSlider={true}
              sliderOnChange={this.symptomsSliderOnChange}
            />

            <br />

            <p className="really-small-text">This is not medical advice or a best practice example to follow </p>

          </div>
          <div id="symptoms-chart" className="chart">
            <Chart
              keyword={this.state.keyword}
              minCount={this.state.symptomsSliderValue}
              data={this.state.data.associated_symptoms}
              resource="symptoms"
            />
            <p className="" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus dolor eros, eu bibendum felis tristique non. </p>
          </div>
        </div>

        <div className="line-separator"></div>

        /* Dosages result, only rendered if the keyword is a drug */
        <DosageChart
          isDrug={true}
        />

        <div className="line-separator"> </div>
      </div>
    );
  }
}