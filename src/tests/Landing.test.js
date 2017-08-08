import React from 'react';
import ReactDOM from 'react-dom';
import Landing from '../components/Landing';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

it('renders landing page', () => {
  const wrapper = shallow(<Landing />);
  const welcome = <h1 className="title is-centered">Nettipuoskari</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

// This test just checks that these exist and can be altered.
it('can search with a keyword', () => {
  const wrapper = mount(<Landing />);
  let input = wrapper.find("input").first();
  let button = wrapper.find("input").last();
  
  input.simulate('change', {target: {value: 'My new value'}});
  button.simulate('click');

  
});