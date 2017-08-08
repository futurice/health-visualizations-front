import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';


const renderApp = () => {
  const div = document.createElement('div');
  let dom =ReactDOM.render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
    , div);
  return dom;
}

it('renders without crashing', () => {
  renderApp();
});
