import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

import { RequestDeleteTask, RequestEditTask, RequestGetAllTask } from '../../redux/Action/action_todo';
import * as actions from './action_todo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    let store;
    var data;

    beforeEach(() => {
        store = mockStore();
    })

    afterEach(() => {
        // fetchMock.reset()
        // fetchMock.restore()
    })

    it('should TASK_ADDED when adding is done', () => {
        let date = new Date();
        let detailTask = {
            name: 'Tunggu aku pacar oi', 
            status: 'On Going', 
            created_date: date.getTime()
        };

        // fetchMock.postOnce('/tasks', { body: detailTask, headers: { 'content-type': 'application/json' }} );

        const expectedActions = [
            { type: 'TASK_ADDING' },
            { type: 'TASK_ADDED', payload: expect.any(Object)},
            { type: 'TASK_FETCHING'}
        ];

        return store.dispatch(actions.RequestAddTask(detailTask)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
            data = store.getActions().filter((item) => {
                return item.type == 'TASK_ADDED'  
            });
        });
    })

    it('should TASK_FETCHED when fetching is done', () => { 
        const expectedActions = [
            { type: 'TASK_FETCHING' },
            { type: 'TASK_FETCHED', payload: expect.any(Object) }
        ];

        return store.dispatch(actions.RequestGetAllTask()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })

    it('should TASK_EDITED when editing is done', () => {

        let  _id = data[0].payload._id;
        let detailTask = {
            name: 'Belanja di pasar makan', 
            status: data[0].payload.status, 
            created_date: data[0].payload.created_date
        };

        // fetchMock.putOnce('/tasks'+_id, detailTask);

        const expectedActions = [
            { type: 'TASK_EDITING' },
            { type: 'TASK_EDITED', payload: expect.any(Object)},
            { type: 'TASK_FETCHING'}
        ];


        return store.dispatch(actions.RequestEditTask(_id,detailTask)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })

    it('should TASK_DELETED when deleting is done', () => {
        let  _id = data[0].payload._id;
        // fetchMock.delete('/tasks/'+_id, 200);

        const expectedActions = [
            { type: 'TASK_DELETING' },
            { type: 'TASK_DELETED', payload: {'message':'Task '+_id+' deleted!'}},
            { type: 'TASK_FETCHING'}
        ];

        return store.dispatch(actions.RequestDeleteTask(_id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })
})