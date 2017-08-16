import React, { Component } from 'react';
import '../css/Search.css';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import SearchBox from './SearchBox';
import { getByKeyword, getQuotesByKeywords, isNumeric } from '../util';
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
      keyword: this.props.match.params.keyword,
      loading: true,
      drugsSliderValue: 30,
      symptomsSliderValue: 30,
      quoteModalResource: "temp"
    };

    this.updateKeyword = this.updateKeyword.bind(this);
    this.findByKeyword = this.findByKeyword.bind(this);
    this.drugsSliderOnChange = this.drugsSliderOnChange.bind(this);
    this.symptomsSliderOnChange = this.symptomsSliderOnChange.bind(this);
    this.getHeading = this.getHeading.bind(this);

    this.associatedOnClick = this.associatedOnClick.bind(this);
    this.dosagesOnClick = this.dosagesOnClick.bind(this);
  }

  getHeading() {
    if ("relatedQuotes" === this.state.quoteModalResource) {
      return `Posts with ${this.state.keyword} and ${this.state.keyword2}`;
    } else if ("dosageQuotes" === this.state.quoteModalResource) {
      return `Posts with ${this.state.keyword} ${this.state.keyword2} mg`;
    } else {
      return `Posts with ${this.state.keyword}`;
    }
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

  updateKeyword(keyword) {
    this.setState({
      keyword
    });
  }

  associatedOnClick(e) {
    let keyword2 = e.MedicineName;
    
    this.setState({
      keyword2: keyword2,
      quoteModalResource: "relatedQuotes"
    }, () => {
      this.setState({ quoteModalIsOpen: true });
      this.props.history.push(`/search/${this.state.keyword}?quotes_with=${keyword2}&page=1`);
    });
  }

  dosagesOnClick(e) {
    let keyword2 = e.data.Dosage;

    this.setState({
      keyword2: keyword2,
      quoteModalResource: "dosageQuotes"
    }, () => {
      this.setState({quoteModalIsOpen: true});
    });
  }

  componentWillMount() {
    this.findByKeyword();
  }

  componentDidMount() {
    /* Preopen modal on certain links e.g /search/burana?quotes_with=ibusal */
    const queryParams = queryString.parse(this.props.location.search);
    const quoteKeyword = queryParams["quotes_with"];

    /* Assume this refers to a dosage, not a drug or symptom */
    const resource = isNumeric(quoteKeyword) ? "dosageQuotes" : "relatedQuotes";
    const page = parseInt(queryParams["page"]);

    if (quoteKeyword) {
      this.setState({
        keyword2: quoteKeyword,
        quoteModalIsOpen: true,
        quoteModalResource: resource,
        quoteModalPage: page
      });
    }
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
      }).catch((error) => {
          if (error.response.status === 404) {
            this.props.history.push("/not_found/" + this.state.keyword);
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
          isOpen={this.state.basketModalIsOpen}
          data={this.state.data.basket}
          closeModal={() => this.setState({basketModalIsOpen: false})}
          heading={"Words interpreted as " + this.state.keyword}
        />

        <QuoteModal
          isOpen={this.state.quoteModalIsOpen}
          closeModal={() => {
            this.setState({
              quoteModalIsOpen: false
            });
            this.props.history.push(`/search/${this.state.keyword}`);
          }}
          heading={this.getHeading()}
          keyword1={this.state.keyword}
          keyword2={this.state.keyword2}
          searchWords={this.state.data.basket}
          resource={this.state.quoteModalResource}
          forcePage={this.state.quoteModalPage}
          history={this.props.history}
          match={this.props.match}
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
          <a onClick={() => this.setState({quoteModalResource: "keywordQuotes", quoteModalIsOpen: true, keyword2: undefined})} className="list-of-posts body-text is-tight">{this.state.data.post_count} posts</a><br/>
          <a onClick={() => this.setState({basketModalIsOpen: true})} className="list-of-bucket body-text"> Words interpreted as {this.state.keyword} </a>
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
              keyword={this.state.keyword}
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
              keyword={this.state.keyword}
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
          keyword={this.state.keyword}
          onClick={this.dosagesOnClick}
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