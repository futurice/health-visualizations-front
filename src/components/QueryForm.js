import React from 'react';
import { render } from 'react-dom';
import '../css/QueryForm.css';

import {
  Link
} from 'react-router-dom'

import { Redirect } from 'react-router';


export default class QueryForm extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    let text = event.target.value;
    this.setState({
      inputValue: text
    });
  }

  onSubmit(event) {
    event.preventDefault() // Stop full page reload
    this.props.onSubmit(this.state.inputValue);
    
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/sample" />;
    }
    return ( 
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <input className="input" onChange={this.handleChange} placeholder="Search e.g burana" />
          <input className="button" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}