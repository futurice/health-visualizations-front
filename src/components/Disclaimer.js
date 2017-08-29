import React, { Component } from 'react';
import '../css/Disclaimer.css';

const SEEN = "cookie-disclaimer-seen";

export default class Disclaimer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.hasUserSeenAlready = this.hasUserSeenAlready.bind(this);
    this.dismiss = this.dismiss.bind(this);
    
  }

  hasUserSeenAlready() {
    console.log(localStorage.getItem(SEEN))
    return !!localStorage.getItem(SEEN);
  }

  dismiss() {
    localStorage.setItem(SEEN, "true");
    this.setState(this.state);
  }

  render() {
    if (this.hasUserSeenAlready()) {
      return null;
    }
    return (
    <div className="disclaimer-container">
      <h3> This is not medical advice </h3>
      
      <p> 
      This site presents data from online discussions of people who are not doctors. If you are in need of medical advice, talk to your doctor.
      <br /><br />This site uses cookies. By using this site you agree to our use of cookies.
      </p>
      <button onClick={this.dismiss}>I Agree</button>
    </div> 
    );
  }
}