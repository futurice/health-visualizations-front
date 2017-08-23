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

export default class Landing extends Component {

  constructor(props) {
    super(props);

    this.state = {}
    this.chartOnClick = this.chartOnClick.bind(this);
  }

  chartOnClick(keyword) {
    this.props.history.push(`/search/${keyword}`);    
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
            <img src={logo} className="logo" alt="logo" />
            <h1 className="title is-centered">Nettipuoskari</h1>
            <p className="really-small-text is-centered"> A data science project by <a href="http://futurice.com/"> Futurice’s</a> <a href="https://spiceprogram.org/chilicorn-fund/"> Chilicorn Fund</a> and <a href="http://blogs.helsinki.fi/citizenmindscapes/"> Citizen Mindscapes </a> </p>
            <h3 className="heading-2 is-centered"> How are Finns talking about drugs? </h3>


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
                  <div className="numbers-duo-calendar-container">
                    <img src={calendarIcon} className="calendar-icon" alt="calendar-icon" />
                    <div className="numbers-duo-calendar-text">
                      <p>
                      01.2001<br/>
                      12.2016
                      </p>
                    </div>
                  </div>
                </div>


              </div>

                <p className="body-text">
                    Traditional medical research is expensive and focused on predetermined research questions. On the other hand, there is a huge amount of freely accessible Suomi24 online discussion data where people candidly describe their experiences. The topics which appear in these discussions are those that people truly care about. We used machine learning to organize and present this data in a way that would be useful to researchers.
                    <br />
                    <a className="whole-story" href="#"> Read the full story </a>                    
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
                    onClick={this.chartOnClick}
                  />
                </div>
                <div id="symptoms-chart">
                  <MostCommonChart
                    resource="symptoms"
                    data={this.state.symptomData}
                    onClick={this.chartOnClick}
                  />
                </div>
              </div>
            </div>

            <div className="more-information">
              <h3 className="heading-3"> For more information </h3>
                <p className="small-text"> If you have any questions or feedback, feel free to contact us with the button below  </p>
                <FeedbackButton />
                <p className="really-small-text">
                  This site was made by <a href="https://futurice.com">Futurice</a> in collaboration with <a href="http://blogs.helsinki.fi/citizenmindscapes/">Citizen Mindscapes</a>
                </p>
            </div>

            <section className="chilicorn hero">
              <div className="chilicorn-container">
                <h1 className="fund-title"> Chilicorn Fund </h1>
                <h2>Pro bono projects for a slightly better world, by <a href="https://futurice.com">Futurice</a> </h2>
              </div>
              <img alt="A unicorn" className="chilicorn-static" src={unicorn} />
            </section>
        </div>
    );
  }

}