import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Homepage from './';

Enzyme.configure({ adapter: new Adapter()});

describe('Homepage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Homepage />
    )
    expect(toJson(wrapper), {mode:'shallow'}).toMatchSnapshot();
  });
})
