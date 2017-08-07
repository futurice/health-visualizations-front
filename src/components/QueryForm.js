import React from 'react';
import '../css/QueryForm.css';

export default class QueryForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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
          <input ref="input" className="input" placeholder={this.props.value || "Enter any drug or symptom name (in Finnish)"} />
          <input type="submit" className="button" value="Search" />
        </form>
    );
  }
}