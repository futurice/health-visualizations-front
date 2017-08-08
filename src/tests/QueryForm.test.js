import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from '../components/QueryForm';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

it("can render", () => {
  shallow(<QueryForm />);
})