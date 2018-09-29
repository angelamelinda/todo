import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import { AddTask } from './';
import * as helper from '../../helper';

Enzyme.configure({ adapter: new Adapter()});

describe('AddTask', () => {
    
    let props = helper.mockData();
    let mountedApp;

    const addTask = () => {
        if(!mountedApp) {
            mountedApp = mount (
                <AddTask {...props} />
            )
        }
        return mountedApp;
    }
    beforeEach(() => {
        mountedApp = null
    })

    it('handleSubmit when the button save is clicked', () => {
        let formAddTask = addTask().find('form');
        expect(formAddTask.exists()).toBe(true);
        formAddTask.find('input').instance().value = 'Senang yuk';
        formAddTask.simulate('submit');
        expect(addTask().prop("RequestAddTask")).toHaveBeenCalled();
    })
    
    it('matches with snapshot', () => {
        const wrapper = shallow(
            <AddTask {...props} />
        );
        expect(toJson(wrapper),{mode:'shallow'}).toMatchSnapshot();
    })
})

