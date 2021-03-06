import React, { Component } from 'react';
import '../css/Search.css';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import SearchBox from './SearchBox';
import { getByKeyword } from '../util';
import BasketModal from './BasketModal';
import QuoteModal from './QuoteModal';
import AssociatedChart from './charts/AssociatedChart';
import Spinner from 'react-spinkit'
import WarningText from './WarningText';
import queryString from 'query-string';
import postsSmallIcon from '../css/posts-small.svg';
import _ from 'lodash';

export default class Search extends Component {

  drugChartContainer = null;
  symptomChartContainer = null;
  dosageChart = null;
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.findByKeyword = this.findByKeyword.bind(this);
    this.onClickLabel = this.onClickLabel.bind(this);
    this.onClickBubble = this.onClickBubble.bind(this);
    this.dosagesOnClick = this.dosagesOnClick.bind(this);
    this.getKeyword = this.getKeyword.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.getSliderVal = this.getSliderVal.bind(this);
    this.onChangeSlider = this.onChangeSlider.bind(this);

    this.onResize = this.onResize.bind(this);
    this.debouncedUpdateDimensions = this.debouncedUpdateDimensions.bind(this);
  }

  getSliderVal(key) {
    let raw = localStorage.getItem(key);
    if (!raw) {
      return 30;
    }
    return parseInt(raw);
  }

  onChangeSlider(sliderType, e, rerender=true) {
    localStorage.setItem(sliderType, e);
    if (rerender) {
      this.setState(this.state);
    }
  }

  onClickBubble(e) {
    let keyword2 = e.MedicineName;
    
    this.setState({
      quoteModalResource: "relatedQuotes"
    }, () => {
      this.props.history.replace(`/search/${this.getKeyword()}?quotes_with=${keyword2}&page=1`);
    });
  }

  onClickLabel(e) {
    let keyword = e.MedicineName;
    this.props.history.push(`/search/${keyword}`);
  }

  dosagesOnClick(e) {
    let keyword2 = e.data.Dosage;

    this.props.history.replace(`/search/${this.getKeyword()}?quotes_with=${keyword2}&page=1`);      
  }
  
  onBackButtonEvent(e) {
    if (this.quoteModalIsOpen() || this.basketModalIsOpen()) {
      this.props.history.push(this.props.location.pathname);
    }
  }



  quoteModalIsOpen() {
    const queryParams = queryString.parse(this.props.location.search);
    return !!queryParams["quotes_with"] || !!queryParams["posts"];
  }

  basketModalIsOpen() {
    const queryParams = queryString.parse(this.props.location.search);
    return !!queryParams["basket"];
  }

  getKeyword() {
    return this.props.match.params.keyword;
  }

  debouncedUpdateDimensions = _.debounce(this.onResize, 200);  

  onResize() {
    const bubblePlotWidth = (this.dosageChart && this.dosageChart.bubbleChartContainer ? this.dosageChart.bubbleChartContainer.clientWidth : 0);
    const symptomPlotWidth = this.symptomChartContainer.clientWidth;
    const drugPlotWidth = this.drugChartContainer.clientWidth;

    this.setState({
      bubblePlotWidth,
      symptomPlotWidth,
      drugPlotWidth
    });
  }

  componentWillMount() {
    this.findByKeyword();
    window.onpopstate = this.onBackButtonEvent;
    window.addEventListener("resize", this.debouncedUpdateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedUpdateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.getKeyword() !== nextProps.match.params.keyword) {
      this.findByKeyword();
    }
  }

  findByKeyword() {
    this.setState({
      loading: true
    }, () => {
      getByKeyword(this.getKeyword()).then((response) => {
        this.setState({
          data: response.data,
          loading: false
        });

        this.onResize();
      }).catch((error) => {
          if (error.response && error.response.status === 404) {
            this.props.history.replace("/not_found/" + this.getKeyword());
          } else {
            console.error(error);
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
        <BasketModal
          isOpen={this.basketModalIsOpen()}
          data={this.state.data.basket}
          closeModal={this.props.history.goBack}
          heading={"Words interpreted as " + this.getKeyword()}
        />

        <QuoteModal
          isOpen={this.quoteModalIsOpen()}
          closeModal={this.props.history.goBack}
          searchWords={this.state.data.basket}
          resource={this.state.quoteModalResource}
          forcePage={this.state.quoteModalPage}
          history={this.props.history}
          match={this.props.match}
          location={this.props.location}
        />

        <SearchBox
          history={this.props.history}
          match={this.props.match}
          notVisible={this.basketModalIsOpen() || this.quoteModalIsOpen()}
        />
        
        <div className="search-term-info">
          <p className="size-18"> Search result / {this.state.data.dosages ? "drug" : "symptom"} </p>
          <h3 className="no-margin size-45"> {this.getKeyword()} </h3>

          <div className="post-link-container">
            <div className="post-link-icon">
              <img src={postsSmallIcon} className="posts-small-icon" alt="posts-icon" />
            </div>
            <div className="post-link-text">
              <a onClick={() => this.props.history.push(this.props.location.pathname + "?posts=true&page=1")} className="text-link size-16">{this.state.data.post_count} posts</a>
            </div>
          </div>
          <div className="basket-link-container">
            <p>
              <a onClick={() => this.props.history.push(this.props.location.pathname + "?basket=true")} className="text-link size-14"> Words interpreted as {this.getKeyword()} </a></p>
          </div>
        </div>

        {/* Drugs association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              sliderType="drugsSlider"
              getSliderVal={this.getSliderVal}
              onChangeSlider={this.onChangeSlider}
            />
          </div>
          <div id="drugs-chart" className="chart">

            <div ref={(e) => this.drugChartContainer = e} id="drugs-chart" className="chart">
              <AssociatedChart
                keyword={this.getKeyword()}
                minCount={this.getSliderVal("drugsSlider")}
                data={this.state.data.associated_drugs}
                resource="drugs"
                onClickLabel={this.onClickLabel}
                onClickBubble={this.onClickBubble}
                width={this.state.drugPlotWidth}
              />
            </div>
          </div>
        </div>

        <br />

          {/* Symptoms association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              sliderType="symptomsSlider"
              getSliderVal={this.getSliderVal}
              onChangeSlider={this.onChangeSlider}
            />

            <br />

          </div>
          <div ref={(e) => this.symptomChartContainer = e} id="symptoms-chart" className="chart">
            <AssociatedChart
              keyword={this.getKeyword()}
              minCount={this.getSliderVal("symptomsSlider")}
              data={this.state.data.associated_symptoms}
              resource="symptoms"
              onClickLabel={this.onClickLabel}
              onClickBubble={this.onClickBubble}
              width={this.state.symptomPlotWidth}
            />
          </div>
        </div>

        <br/>

        {/* Dosages result, only rendered if the keyword is a drug */}
        <DosageChart
          isDrug={this.state.data.dosages}
          data={this.state.data.dosages}
          keyword={this.getKeyword()}
          onClick={this.dosagesOnClick}
          width={this.state.bubblePlotWidth}
          ref={(e) => this.dosageChart = e}
        />


        <div className="footer size-14 centered white">
          <p>_Lääketutka is a data science project by <a href="https://spiceprogram.org/chilicorn-fund/"> Futurice’s Chilicorn Fund</a></p>

          <p>In partnership with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes </a></p>

          <p>Based on <a href="https://www.suomi24.fi/">Suomi24 forum</a> data provided by <a href="https://www.aller.fi/">Aller</a></p>

          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUNP2r2h5VO2DnnYNpB9D3elPX7F2vfxxKyOfLEnSacPEKUw/viewform"> Contact us </a>
        </div>
      </div>
        );

  }
};
