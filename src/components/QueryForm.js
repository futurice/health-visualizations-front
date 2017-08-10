import React from 'react';
import '../css/QueryForm.css';
import _ from 'lodash';

export default class QueryForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.downcase = this.downcase.bind(this);
  }

  downcase(e) {
    let value = e.target.value;
    this.setState({
      value: value.toLowerCase()
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let value = this.refs.input.value;
    
    if (this.props.updateKeyword) {
      this.props.updateKeyword(value);      
    }
    if (this.props.findByKeyword) {
      this.props.findByKeyword(value);
    }
    this.props.history.push(`/search/${value}`);
  }

  render() {
    return (
        <form className="form" onSubmit={this.handleSubmit} >
          <input value={this.state.value} ref="input" onChange={this.downcase} className="input" placeholder={this.props.value || "Enter any drug or symptom name (in Finnish)"} />
          <input type="submit" className="button" value="Search" />
        </form>
    );
  }
}