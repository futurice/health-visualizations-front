import React, { Component } from 'react';
import './css/Landing.css';
import MostCommon from './MostCommon.js';
import logo from './css/chilicorn_sticker.svg';
import QueryForm from './components/QueryForm.js';
import ChilicornBackground from './css/chilicorn-world.jpg';

export default class Landing extends Component {
  render() {

    let chilicornStyle = {
        backgroundImage: `url(${ChilicornBackground})`
    };
    return (
        <div>
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title"> Nettipuoskari </h1>
          <h3 className="heading-2"> How are Finns talking about drugs? </h3>

          <p className="really-small-text"> A data science project by Futurice’s Chilicornfund and Spice Program </p>

          <div className="body-text-container">
              <p className="body-text">
                  We are interested in doing research on people’s experiences with health and drugs on the Suomi24-dataset using machine learning methods. The topics and themes that the people themselves like to talk about are given in these discussions, as opposed to traditional studies where the researchers create the topics.
              </p>
              <p className="body-text">
                  The research is based on data from posts content from the online forum Suomi24, we focused on the “Health” section and covered the period from 11.11.2016 to 11.11.2017. The results are based on ~19 million posts containing around 200M words
              </p> 
          </div>

            <QueryForm

            />

            <div className="most-common-container">
              <h4 className="heading-4">Most common drugs mentioned</h4>
              <h4 className="heading-4">Most common symptoms mentioned</h4>
            </div>

            <h4 className="heading-4 heading-4-small">The Case</h4>
            <h1 className="heading-1">Why are we doing this?</h1>

            <div className="body-text-container">
              <p className="body-text">
                Traditional medical research focuses on clinical trials where a very selected group of people answer a set of specific questions. On the other hand, anonymous internet forums provide the place for people to candidly talk about their experiences. The topics and themes that the people themselves like to talk about are given in these discussions, as opposed to traditional studies where the researchers create the topics. We are interested in doing research on people’s experiences with health and drugs on the Suomi24-dataset using machine learning methods.
              </p>
              <p className="body-text">
                Traditional medical research focuses on clinical trials where a very selected group of people answer a set of specific questions. On the other hand, anonymous internet forums provide the place for people to candidly talk about their experiences. The topics and themes that the people themselves like to talk about are given in these discussions, as opposed to traditional studies where the researchers create the topics. We are interested in doing research on people’s experiences with health and drugs on the Suomi24-dataset using machine learning methods.                     
              </p> 
            </div>                

            <h1 className="heading-1">What we did</h1>

            <div className="rectangle-white">
              <h1 className="heading-1-white"> More information </h1>
            </div>

            <div style={ chilicornStyle } className="chilicorn-fund">
              <h1 className="heading-1-chilicorn"> Chilicorn Fund </h1>
              <p className="chilicorn-text">Pro–bono projects for a slightly better world, by Futurice </p>
            </div>


        </div>
    );
  }

}