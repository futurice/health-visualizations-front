import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'

import Landing from './components/Landing';
import Search from './components/Search';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/search/:keyword" component={Search} />
      </Switch>
    );
  }
}