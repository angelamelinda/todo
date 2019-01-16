import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import store from '../Store/';
import _ from 'lodash';
export function RequestAddTask(taskDetail) {
    return dispatch => {
        dispatch({ type: 'TASK_ADDING' });
        return axios({
            method: 'post',
            data: taskDetail,
            adapter: httpAdapter,
            url: 'http://localhost:8000/tasks/'
        }).then(resp => {
            let newData = _.cloneDeep(store.getState().Task.listTask).concat(resp.data);
            dispatch({ type: 'TASK_ADDED', payload: newData })
        }).catch((err) => {
            console.log(err);
        });
    }
}
export function RequestGetAllTask() {
    return dispatch => {
        dispatch({ type: 'TASK_FETCHING' });
        return axios({
            method: 'get',
            adapter: httpAdapter,
            url: 'http://localhost:8000/tasks/'
        }).then(resp => {
            dispatch({ type: 'TASK_FETCHED', payload: resp.data });
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function RequestDeleteTask(id) {
    return dispatch => {
        dispatch({ type: 'TASK_DELETING' });
        let url = 'http://localhost:8000/tasks/' + id;
        return axios({
            method: 'delete',
            adapter: httpAdapter,
            url: url
        }).then(resp => {
            let newData = _.cloneDeep(store.getState().Task.listTask);
            _.remove(newData, ['_id', resp.data.id]);
            dispatch({ type: 'TASK_DELETED', payload: newData })
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function RequestEditTask(id, data) {
    return dispatch => {
        dispatch({ type: 'TASK_EDITING' });
        let url = 'http://localhost:8000/tasks/' + id;
        return axios({
            method: 'put',
            data: data,
            adapter: httpAdapter,
            url: url
        }).then(resp => {
            let newData = _.cloneDeep(store.getState().Task.listTask);
            const dataIdx = _.findIndex(newData, ['created_date', resp.data['created_date']])
            newData[dataIdx]['status'] = resp.data['status'];
            newData[dataIdx]['name'] = resp.data['name'];
            console.log(newData)
            dispatch({ type: 'TASK_EDITED', payload: newData })
        }).catch((err) => {
            console.log(err);
        })
    }
}