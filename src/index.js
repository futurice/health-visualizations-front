import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route} from 'react-router-dom';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-105305355-1');

/**
 * @return {null}
 */
function Analytics(props){
  ReactGA.set({ page: props.location.pathname + props.location.search });
  ReactGA.pageview(props.location.pathname + props.location.search);
  return null;
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <App />
      <Route path="/" component={Analytics}/>
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
