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

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      drugsSliderValue: 30,
      symptomsSliderValue: 30
    };

    this.findByKeyword = this.findByKeyword.bind(this);
    this.drugsSliderOnChange = this.drugsSliderOnChange.bind(this);
    this.symptomsSliderOnChange = this.symptomsSliderOnChange.bind(this);

    this.associatedOnClick = this.associatedOnClick.bind(this);
    this.dosagesOnClick = this.dosagesOnClick.bind(this);
    this.getKeyword = this.getKeyword.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
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

  associatedOnClick(e) {
    let keyword2 = e.MedicineName;
    
    this.setState({
      quoteModalResource: "relatedQuotes"
    }, () => {
      this.props.history.replace(`/search/${this.getKeyword()}?quotes_with=${keyword2}&page=1`);
    });
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
          <p className="result"> Search result / {this.state.data.dosages ? "drug" : "symptom"} </p>
          <h3 className="keyword heading-3"> {this.getKeyword()} </h3>
          <a onClick={() => this.props.history.push(this.props.location.pathname + "?posts=true&page=1")} className="list-of-posts body-text is-tight">{this.state.data.post_count} posts</a><br/>
          <a onClick={() => this.props.history.push(this.props.location.pathname + "?basket=true")} className="list-of-bucket body-text"> Words interpreted as {this.getKeyword()} </a>
        </div>

        {/* Drugs association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              bodyText={<p className="body-text">Relevance is calculated by a statistical metric called <a href="https://en.wikipedia.org/wiki/Lift_(data_mining)">Lift</a>. In short, Lift measures how likely other drugs are to appear in a post, given that the search term appears in that post. This measure takes into account how often a drug appears overall in the data -- common drugs are not favored over less common drugs. </p>}
              includeSlider={true}
              sliderOnChange={this.drugsSliderOnChange}
            />
          </div>

          <div id="drugs-chart" className="chart">
            <AssociatedChart
              keyword={this.getKeyword()}
              minCount={this.state.drugsSliderValue}
              data={this.state.data.associated_drugs}
              resource="drugs"
              onClick={this.associatedOnClick}
            />
            <WarningText />
          </div>
        </div>

        <br />

        {/* Symptoms association result */}
        <div className="association-result">
          <div className="association-result-left">

            <ChartSideBar
              bodyText={<p className="body-text">Relevance is calculated by a statistical metric called <a href="https://en.wikipedia.org/wiki/Lift_(data_mining)">Lift</a>. In short, Lift measures how likely symptoms are to appear in a post, given that the search term appears in that post. This measure takes into account how often a symptom appears overall in the data -- common symptoms are not favored over less common symptoms.</p>}
              includeSlider={true}
              sliderOnChange={this.symptomsSliderOnChange}
            />

            <br />

          </div>
          <div id="symptoms-chart" className="chart">
            <AssociatedChart
              keyword={this.getKeyword()}
              minCount={this.state.symptomsSliderValue}
              data={this.state.data.associated_symptoms}
              resource="symptoms"
              onClick={this.associatedOnClick}
            />
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

        <div className="footer">
          <p>_Nettipuoskari is a data science project by <a href="https://spiceprogram.org/chilicorn-fund/"> Futurice’s Chilicorn Fund</a></p>

          <p>In partnership with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes </a></p>

          <p>This work is licenced under ???</p>

          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUNP2r2h5VO2DnnYNpB9D3elPX7F2vfxxKyOfLEnSacPEKUw/viewform"> Contact us </a>
        </div>
      </div>
    );
  }
}