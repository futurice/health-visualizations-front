import React from 'react';
import '../css/QueryForm.css';
import { Redirect } from 'react-router';

export default class QueryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault() // Stop full page reload

    this.setState({
      redirect: this.refs.input.value
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/search/${this.state.redirect}`} />;
    }
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input ref="input" className="input" placeholder={this.props.value} />
        <input className="button" type="submit" value="Search" />
      </form>
    );
  }
}