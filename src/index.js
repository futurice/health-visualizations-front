import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-105305355-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <BrowserRouter onUpdate={logPageView}>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
