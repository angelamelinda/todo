import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

export function RequestAddTask(taskDetail) {
    return dispatch => {
        dispatch({type:'TASK_ADDING'});
        // return axios.post(`http://localhost:8000/tasks/`, 
        //     taskDetail
        // )
        return axios({
            method: 'post',
            data: taskDetail,
            adapter: httpAdapter,
            url: 'http://localhost:8000/tasks/'
        }).then(resp => {
            dispatch({type:'TASK_ADDED',payload:resp.data})
            dispatch(RequestGetAllTask());
        }).catch((err) => {
            console.log(err);
        });
    }
}
export function RequestGetAllTask() {
    return dispatch => {
        dispatch({type:'TASK_FETCHING'});
        // return axios.get(`http://localhost:8000/tasks/`).then(resp => {
        return axios({
            method: 'get',
            adapter: httpAdapter,
            url: 'http://localhost:8000/tasks/'
        }).then(resp => {
            dispatch({type:'TASK_FETCHED', payload: resp.data});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function RequestDeleteTask(id) {
    return dispatch => {
        dispatch({type:'TASK_DELETING'});
        let url = 'http://localhost:8000/tasks/'+id;
        // return axios.delete(url).then(resp => {
        return axios({
            method: 'delete',
            adapter: httpAdapter,
            url: url
        }).then(resp => {
            dispatch({type:'TASK_DELETED',payload:resp.data})
            dispatch(RequestGetAllTask());
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function RequestEditTask(id, data) {
    return dispatch => {
        dispatch({type:'TASK_EDITING'});
        let url = 'http://localhost:8000/tasks/'+id;
        // return axios.put(url, data).then(resp => {
        return axios({
            method: 'put',
            data: data,
            adapter: httpAdapter,
            url: url
        }).then(resp => {
            dispatch({type:'TASK_EDITED',payload:resp.data})
            dispatch(RequestGetAllTask());
        }).catch((err) => {
            console.log(err);
        })
    }
}