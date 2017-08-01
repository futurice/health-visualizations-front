import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'

import Landing from './components/Landing';
import Search from './components/Search';
import NotFound from './components/NotFound';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/search/:keyword" component={ Search } />
        <Route exact path='/not_found' component={ NotFound } />
      </Switch>
    );
  }
}