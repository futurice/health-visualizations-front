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
      <h3> Disclaimer </h3>
      
      <p> 
      You should not take anything said here as medical advice, this site is not meant to be a replacement for medical doctors. We are not responsible for the opinions of people expressed on this site. Please, if you are in need of medical attention, seek the help of a doctor.
      <br /><br />This site uses cookies to enhance the site's user experience. By using this site you agree to this.
      </p>
      <button onClick={this.dismiss}>I Agree</button>
    </div> 
    );
  }
}