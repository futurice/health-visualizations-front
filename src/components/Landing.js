import React, { Component } from 'react';
import '../css/Landing.css';
import logo from '../css/chilicorn-logo.svg';
import QueryForm from './QueryForm';
import ChilicornBackground from '../css/chilicorn-world.png';
import FeedbackButton from './FeedbackButton';

export default class Landing extends Component {
  render() {

    let chilicornStyle = {
        backgroundImage: `url(${ChilicornBackground})`
    };
    return (
        <div>
          <div className="content">
            <img src={logo} className="logo" alt="logo" />
            <h1 className="title is-centered">Nettipuoskari</h1>
            <h3 className="heading-2 is-centered"> How are Finns talking about drugs? </h3>

            <p className="really-small-text is-centered"> A data science project by <a href="http://futurice.com/"> Futurice’s</a> <a href="https://spiceprogram.org/chilicorn-fund/"> Chilicornfund</a> and <a href="http://blogs.helsinki.fi/citizenmindscapes/"> Citizen Mindscapes </a> </p>

            <div className="body-text-container">
                <p className="body-text">
                    Traditional medical research is expensive and focused on predetermined research questions. On the other hand, there is a huge amount of freely accessible Suomi24 online discussion data where people candidly describe their experiences. The topics which appear in these discussions are those that people truly care about. We used machine learning to organize and present this data in a way that would be useful to researchers.
                </p>
                <p className="body-text">
                    The research is based on data from posts content from the online forum Suomi24, we focused on the “Health” section and covered the period from 11.11.2016 to 11.11.2017. The results are based on ~19 million posts containing around 200M words
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
                <h4 className="heading-4 most-common-header">Most common drugs mentioned</h4>
                <h4 className="heading-4 most-common-header">Most common symptoms mentioned</h4>
              </div>
            </div>
            
            <div className="rectangle-white">
              <h1 className="heading-1-white"> More information </h1>
              <div className="contact">
                <FeedbackButton />    
              </div>
            </div>

            <div style={ chilicornStyle } className="chilicorn-fund">
              <h1 className="heading-1-chilicorn"> Chilicorn Fund </h1>
              <p className="chilicorn-text">Pro–bono projects for a slightly better world, by <a href="https://futurice.com">Futurice</a> </p>
            </div>
        </div>
    );
  }

}