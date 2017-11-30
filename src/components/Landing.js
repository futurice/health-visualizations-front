import React, { Component } from 'react';
import '../css/Landing.css';
import logo from '../css/chilicorn-logo.svg';
import unicorn from '../css/chilicorn.png';
import QueryForm from './QueryForm';
import FeedbackButton from './FeedbackButton';
import Spinner from 'react-spinkit';

import calendarIcon from '../css/calendar.svg';
import postsIcon from '../css/posts.svg';
import quotesIcon from '../css/group-3.svg';

import MostCommonChart from './charts/MostCommonChart';
import { getMostCommon } from '../util';
import WarningText from "./WarningText";

export default class Landing extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.onClickLabel = this.onClickLabel.bind(this);
    this.onClickBar = this.onClickBar.bind(this);
  }

  onClickLabel(keyword) {
    this.props.history.push(`/search/${keyword}`);    
  }

  onClickBar(keyword) {
    this.props.history.push(`/search/${keyword}` + "/?posts=true&page=1");
  }

  componentWillMount() {
    this.setState({
      loading: true
    }, () => {
      Promise.all([
        getMostCommon("drugs"),
        getMostCommon("symptoms")
      ]).then((response) => {
        this.setState({
          drugData: response[0].data,
          symptomData: response[1].data,
          loading: false
        })
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  render() {
    
    if (this.state.loading) {
      return <Spinner fadeIn="none" name="pulse" color='white' />;
    }

    return (
        <div>
          <div className="content">
            <h1 className="title centered">Lääketutka</h1>

            <h3 className="heading-2 centered"> How are Finns talking about drugs? </h3>
            <p className="size-16 centered whiteish">
              A data science project by <a href="http://futurice.com/" target="_blank"> Futurice’s</a> <a href="https://spiceprogram.org/chilicorn-fund/" target="_blank"> Chilicorn Fund</a> and <a href="http://blogs.helsinki.fi/citizenmindscapes/" target="_blank"> Citizen Mindscapes </a>
              <br/>With data provided by <a href="http://www.aller.fi/" target="_blank">Aller</a>
            </p>

            <div className="body-text-container">
              <div className="numbers-container">
                <div className="numbers-duo">
                  <div className="numbers-duo-text">
                    <div>
                      <p className="numbers-duo-text-large">19M</p>
                      <p className="numbers-duo-text-small">posts</p>
                    </div>
                  </div>
                  <div className="numbers-duo-icon">
                    <img src={postsIcon} className="posts-icon" alt="posts-icon" />
                  </div>
                </div>
                <div className="numbers-duo">
                  <div className="numbers-duo-text">
                    <div>
                      <p className="numbers-duo-text-large">200M</p>
                      <p className="numbers-duo-text-small">words</p>
                    </div>
                  </div>
                  <div className="numbers-duo-icon icon-centered">
                    <img src={quotesIcon} className="quotes-icon" alt="quotes-icon" />
                  </div>
                </div>
                <div className="numbers-duo">
                  <div className="numbers-duo-text">
                    <div>
                      <p className="numbers-duo-text-large">16</p>
                      <p className="numbers-duo-text-small">years</p>
                    </div>
                  </div>
                  <div className="numbers-duo-icon calendar-container">                  
                    <img src={calendarIcon} className="calendar-icon" alt="calendar-icon" />
                  </div>
                </div>
              </div>

                <p className="size-16 intro-paragraph">
                    Traditional medical research is expensive and focused on predetermined research questions. On the other hand, there is a huge amount of freely accessible Suomi24 online discussion data where people candidly describe their experiences. The topics which appear in these discussions are those that people truly care about. We used machine learning to organize and present this data in a way that would be useful to researchers.
                    <br />
                    <a className="whole-story" href="https://futurice.com/blog/learning-medicinal-habits-from-discussion-forum-data" target="_blank"> Read the full story </a>
                </p>
                

            </div>              
              <div className="form-box">
                <QueryForm
                  history={this.props.history}
                />
              </div>
              <div className="most-common-container">
                <div id="drugs-chart">
                  <MostCommonChart
                    resource="drugs"
                    data={this.state.drugData}
                    onClickLabel={this.onClickLabel}
                    onClickBar={this.onClickBar}
                  />
                </div>
                <div id="symptoms-chart">
                  <MostCommonChart
                    resource="symptoms"
                    data={this.state.symptomData}
                    onClickLabel={this.onClickLabel}
                    onClickBar={this.onClickBar}
                  />
                </div>
              </div>
              <WarningText/>
            </div>

          <div className="more-information">
            <h3 className="heading-1-white"> For more information </h3>
            <br/>
            <p className="size-18 whiteish"> If you have any questions or feedback, check our <a href="/faq">FAQ</a> or contact us with the button below </p>
            <p className="size-18 whiteish">
              This service was made by <a href="https://futurice.com">Futurice</a> in collaboration with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes</a>
            </p><br/>
            <FeedbackButton />

          </div>
        </div>


    );
  }

}