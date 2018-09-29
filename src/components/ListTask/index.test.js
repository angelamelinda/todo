import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import { ListTask } from './';
import * as helper from '../../helper';

Enzyme.configure({ adapter: new Adapter()});

describe('ListTask', () => {
    let props = helper.mockData();
    props.isFetched = true;

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

    it('handleDelete when the button delete is clicked', () => {
        let btnDelete = listTask().find('.button-delete');
        expect(btnDelete.exists()).toBe(true);
        btnDelete.first().simulate('click');
        expect(listTask().prop("RequestDeleteTask")).toHaveBeenCalled();
    })

    it('handleEdit when the button edit is clicked', () => {
        props.edit = jest.fn();
        let btnEdit = listTask().find('.button-edit');
        expect(btnEdit.exists()).toBe(true);
        btnEdit.first().simulate('click');
        expect(listTask().prop("edit")).toHaveBeenCalled();
    })

    it('handleChangeStatus when the button edit is clicked', () => {
        let btnChangeStatus = listTask().find('.button-change-status');
        expect(btnChangeStatus.exists()).toBe(true);
        btnChangeStatus.first().simulate('click');
        expect(listTask().prop("RequestEditTask")).toHaveBeenCalled();
    })

    it('matches with snapshot', () => {
        const wrapper = shallow(
            <ListTask {...props} />
        );
        expect(toJson(wrapper),{mode:'shallow'}).toMatchSnapshot();
    })
})

