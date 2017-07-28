import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Landing from './Landing.js';
import Search from './Search.js';


class App extends Component {
  render() {
    return (
     <Router>
      <div>
        <Route exact path="/" component={Landing}/>
        <Route path="/search" component={Search}/>
      </div>
    </Router>
    );
  }
}

export default App;
