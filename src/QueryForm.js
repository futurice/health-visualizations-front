import React from 'react';
import { render } from 'react-dom';

export default class QueryForm extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
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
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <input onChange={this.handleChange} placeholder="Search e.g burana" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}