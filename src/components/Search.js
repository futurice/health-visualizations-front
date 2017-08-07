import React, { Component } from 'react';
import '../css/Search.css';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import SearchBox from './SearchBox';
import { getByKeyword } from '../util';
import QuoteModal from './QuoteModal';
import AssociatedChart from './charts/AssociatedChart';
import warning from '../css/warning.svg';
import Spinner from 'react-spinkit'

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: this.props.match.params.keyword,
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
          console.error(error); // TODO REMOVE
          if (error.response.status === 404) {
            this.props.history.push("/not_found/" + this.state.keyword);
          }
        })
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner fadeIn="none" name="pulse" color='white' />;
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
        <div className="search-term-info">
          <p className="result"> Search result / {this.state.data.dosages ? "drug" : "symptom"} </p>
          <h3 className="keyword heading-3"> {this.state.keyword} </h3>
          <p className="body-text is-tight" > {this.state.data.postCount} posts </p>
          <a onClick={this.openModal} className="list-of-bucket body-text"> List of terms we think makes {this.state.keyword} </a>
        </div>
        {/* Drugs association result */}
        <div className="association-result">
          <div className="association-result-left">

            <div className="line-separator"></div>

            <ChartSideBar
              bodyText="Relevance is calculated by a statistic metric called <link>lift</link>. In short, Lift measures how likely other drugs are to appear in a post, given that the search term appears in that post. This measure takes into account how often a drug appears overall in the data -- common drugs are not favored over less common drugs."
              includeSlider={true}
              sliderOnChange={this.drugsSliderOnChange}
            />
          </div>

          <div id="drugs-chart" className="chart">
            <AssociatedChart
              keyword={this.state.keyword}
              minCount={this.state.drugsSliderValue}
              data={this.state.data.associated_drugs}
              resource="drugs"
            />
            <div className="minor-margin warning-container">
              <img src={warning} className="warning" alt="warning" />
              <span className="really-small-text">This is not medical advice or a best practice example to follow </span>
            </div>
          </div>
        </div>

        <br />

        {/* Symptoms association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              bodyText="Relevance is calculated by a statistic metric called <link>lift</link>. In short, Lift measures how likely symptoms are to appear in a post, given that the search term appears in that post. This measure takes into account how often a symptom appears overall in the data -- common symptoms are not favored over less common symptoms."
              includeSlider={true}
              sliderOnChange={this.symptomsSliderOnChange}
            />

            <br />

          </div>
          <div id="symptoms-chart" className="chart">
            <AssociatedChart
              keyword={this.state.keyword}
              minCount={this.state.symptomsSliderValue}
              data={this.state.data.associated_symptoms}
              resource="symptoms"
            />
            <div className="minor-margin warning-container">
              <img src={warning} className="warning" alt="warning" />
              <span className="really-small-text">This is not medical advice or a best practice example to follow </span>
            </div>
          </div>
        </div>

        <br />

        {/* Dosages result, only rendered if the keyword is a drug */}
        <DosageChart
          isDrug={true}
          data={this.state.data.dosages}
        />

        <div className="footer">
          <p>_Nettipuoskari is a data science project by <a href="https://spiceprogram.org/chilicorn-fund/"> Futurice’s Chilicorn Fund</a></p>

          <p>In partnership with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes </a></p>

          <p>This work is licenced under ???</p>

          <a href="#"> Contact us </a>
        </div>
      </div>
    );
  }
}