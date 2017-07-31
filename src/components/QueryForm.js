import React from 'react';
import '../css/QueryForm.css';
import { Link } from 'react-router-dom';

export default class QueryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };

  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <div className="form">
        <input onChange={this.handleChange.bind(this)} className="input" placeholder={this.props.value} />
        <Link className="button" to={`/search/${this.state.inputValue}`} >Search</Link>
      </div>
    );
  }
}