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
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      drugsSliderValue: this.getSliderVal("drugsSliderValue"),
      symptomsSliderValue: this.getSliderVal("symptomsSliderValue"),
      drugsSliderVisible: localStorage.getItem("drugsSliderValue") !== null,
      symptomsSliderVisible: localStorage.getItem("symptomsSliderValue") !== null,
    };

    this.findByKeyword = this.findByKeyword.bind(this);
    this.drugsSliderOnChange = this.drugsSliderOnChange.bind(this);
    this.symptomsSliderOnChange = this.symptomsSliderOnChange.bind(this);

    this.onClickLabel = this.onClickLabel.bind(this);
    this.onClickBubble = this.onClickBubble.bind(this);
    this.dosagesOnClick = this.dosagesOnClick.bind(this);
    this.getKeyword = this.getKeyword.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.setDrugsSliderVisible = this.setDrugsSliderVisible.bind(this);
    this.setSymptomsSliderVisible = this.setSymptomsSliderVisible.bind(this);
    this.getSliderVal = this.getSliderVal.bind(this);
  }

  getSliderVal(key) {
    let raw = localStorage.getItem(key);
    if (!raw) {
      return 30;
    }
    return parseInt(raw);
  }

  setDrugsSliderVisible(e) {
    this.setState({drugsSliderVisible: true});
  }

  setSymptomsSliderVisible(e) {
    this.setState({symptomsSliderVisible: true});
  }

  drugsSliderOnChange(e) {
    this.setState({
      drugsSliderValue: e
    });
    localStorage.setItem("drugsSliderValue", e);
  }

  symptomsSliderOnChange(e) {
    this.setState({
      symptomsSliderValue: e
    });
    localStorage.setItem("symptomsSliderValue", e);
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
      e.preventDefault();
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

  componentWillMount() {
    this.findByKeyword();
    window.onpopstate = this.onBackButtonEvent;
    window.addEventListener("resize", this.debouncedUpdateDimensions)

    this.setState({
      drugsSliderValue: this.getSliderVal("drugsSliderValue"),
      symptomSliderValue: this.getSliderVal("symptomsSliderValue")
    });
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
          closeModal={() => this.props.history.push("/search/" + this.getKeyword())}
          heading={"Words interpreted as " + this.getKeyword()}
        />

        <QuoteModal
          isOpen={this.quoteModalIsOpen()}
          closeModal={() => this.props.history.push("/search/" + this.getKeyword())}
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
              bodyText={<p className="size-14">Relevance is calculated by a statistical metric called <a href="https://en.wikipedia.org/wiki/Lift_(data_mining)">Lift</a>.
                In short, Lift measures how likely symptoms are to appear in a post, given that the search term appears in that post.
                This measure takes into account how often a symptom appears overall in the data -- common symptoms are not favored over less common symptoms.
                <br/>
                <br/>
                {this.state.drugsSliderVisible ?
                  "Move slider to change the minimum sample size" :
                  <a onClick={this.setDrugsSliderVisible} className="text-link size-16">Sample size filtering</a>
                }

              </p>}
              value={this.state.drugsSliderValue}
              includeSlider={this.state.drugsSliderVisible}
              sliderOnChange={this.drugsSliderOnChange}
            />
          </div>

          <div ref={(e) => this.drugChartContainer = e} id="drugs-chart" className="chart">
            <AssociatedChart
              keyword={this.getKeyword()}
              minCount={this.state.drugsSliderValue}
              data={this.state.data.associated_drugs}
              resource="drugs"
              onClickLabel={this.onClickLabel}
              onClickBubble={this.onClickBubble}
              //width={this.drugChartContainer ? this.drugChartContainer.clientWidth : 500}
            />
            <span className="size-13 centered whiteish">Click the bubbles to see the posts.</span>
            <WarningText />
          </div>
        </div>

        <br />

        {/* Symptoms association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              bodyText={<p className="size-14">Relevance is calculated by a statistical metric called <a href="https://en.wikipedia.org/wiki/Lift_(data_mining)">Lift</a>.
                In short, Lift measures how likely symptoms are to appear in a post, given that the search term appears in that post.
                This measure takes into account how often a symptom appears overall in the data -- common symptoms are not favored over less common symptoms.
                <br/>
                <br/>
                {this.state.symptomsSliderVisible ?
                  "Move slider to change the minimum sample size" :
                  <a onClick={this.setSymptomsSliderVisible} className="text-link size-16">Sample size filtering</a>
                }

                </p>}
              value={this.state.symptomsSliderValue}
              includeSlider={this.state.symptomsSliderVisible}
              sliderOnChange={this.symptomsSliderOnChange}
            />

            <br />

          </div>
          <div ref={(e) => this.symptomChart = e} id="symptoms-chart" className="chart">
            <AssociatedChart
              keyword={this.getKeyword()}
              minCount={this.state.symptomsSliderValue}
              data={this.state.data.associated_symptoms}
              resource="symptoms"
              onClickLabel={this.onClickLabel}
              onClickBubble={this.onClickBubble}
              //width={this.symptomChartContainer ? this.symptomChartContainer.clientWidth : 500}
            />
            <span className="size-13 centered whiteish">Click the bubbles to see the posts.</span>
            <WarningText />
          </div>
        </div>

        <br/>

        {/* Dosages result, only rendered if the keyword is a drug */}
        <DosageChart
          isDrug={this.state.data.dosages}
          data={this.state.data.dosages}
          keyword={this.getKeyword()}
          onClick={this.dosagesOnClick}
        />

        <div className="footer size-14 centered">
          <p>_Nettipuoskari is a data science project by <a href="https://spiceprogram.org/chilicorn-fund/"> Futurice’s Chilicorn Fund</a></p>

          <p>In partnership with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes </a></p>

          <p>This work is licenced under ???</p>

          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUNP2r2h5VO2DnnYNpB9D3elPX7F2vfxxKyOfLEnSacPEKUw/viewform"> Contact us </a>
        </div>
      </div>
    );
  }
}