import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'

import Landing from './components/Landing';
import Search from './components/Search';
import NotFound from './components/NotFound';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-105305355-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export default class Main extends Component {
  render() {
    return (
      <Switch onUpdate={logPageView}>
        <Route exact path="/" component={ Landing } />
        <Route path="/search/:keyword" component={ Search } />
        <Route path='/not_found/:keyword' component={ NotFound } />
      </Switch>
    );
  }
}