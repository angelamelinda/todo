import axios from 'axios';

export function RequestAddTask(taskDetail) {
    return dispatch => {
        dispatch({type:'TASK_ADDING'});
        return axios.post(`http://localhost:8000/tasks/`, 
            taskDetail
        ).then(resp => {
            dispatch({type:'TASK_ADDED',payload:resp.data})
            dispatch(RequestGetAllTask());
        });
    }
}
export function RequestGetAllTask() {
    return dispatch => {
        dispatch({type:'GETTING_TASK'});
        return axios.get(`http://localhost:8000/tasks/`).then(resp => {
            console.log(resp.data);
            dispatch({type:'GOT_TASK', payload: resp.data});
        })
    }
}

export function RequestDeleteTask(id) {
    return dispatch => {
        console.log('id: ',id)
        dispatch({type:'DELETING_TASK'});
        let url = 'http://localhost:8000/tasks/'+id;
        return axios.delete(url).then(resp => {
            dispatch({type:'DELETED_TASK',payload:resp.data})
            dispatch(RequestGetAllTask());
        })
    }
}
export function RequestChangeStatus(id, data) {
    return dispatch => {
        dispatch({type:'TASK_EDITING'});
        let url = 'http://localhost:8000/tasks/'+id;
        console.log(data,'daata om');
        return axios.put(url, data).then(resp => {
            dispatch({type:'TASK_EDITED',payload:resp.data})
            dispatch(RequestGetAllTask());
        })
    }
}