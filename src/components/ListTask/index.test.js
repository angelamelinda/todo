import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import { ListTask } from './';
import * as helper from '../../helper';

Enzyme.configure({ adapter: new Adapter()});

describe('ListTask', () => {
    
    let props = helper.mockData();
    let mountedApp;

    const listTask = () => {
        if(!mountedApp) {
            mountedApp = mount (
                <ListTask {...props} />
            )
        }
        return mountedApp;
    }
    beforeEach(() => {
        mountedApp = null
    })

    it('matches with snapshot', () => {
        const wrapper = shallow(
            <ListTask {...props} />
        );
        expect(toJson(wrapper),{mode:'shallow'}).toMatchSnapshot();
    })
})

