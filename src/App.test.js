import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App from './App';

Enzyme.configure({ adapter: new Adapter()});

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <App />
    )
    expect(toJson(wrapper), {mode:'shallow'}).toMatchSnapshot();
  });
})
