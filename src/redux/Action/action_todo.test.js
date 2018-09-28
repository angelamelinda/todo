import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './action_todo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore();
    })
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
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

    it('should TASK_DELETED when deleting is done', () => {
        let _id = '5bacdee37935a236e8131f2b';

        fetchMock.delete('/tasks/'+_id, 200);

        const expectedActions = [
            { type: 'TASK_DELETING' },
            { type: 'TASK_DELETED', payload: 'Task '+_id+' deleted!'}
        ];

        return store.dispatch(actions.RequestDeleteTask(_id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })
    it('should TASK_ADDED when adding is done', () => {
        let date = new Date();
        let detailTask = {
            name: 'Belanja di pasar 7', 
            status: 'On Going', 
            created_date: date.getTime()
        };

        fetchMock.postOnce('/tasks', 200);

        const expectedActions = [
            { type: 'TASK_ADDING' },
            { type: 'TASK_ADDED', payload: expect.any(Object)}
        ];


        return store.dispatch(actions.RequestAddTask(detailTask)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })

    it('should TASK_EDITED when editing is done', () => {

        let  _id = '5bacdee37935a236e8131f2b';
        let detailTask = {
            name: 'Belanja di pasar 7', 
            status: 'On Going', 
            created_date: 12121212121
        };

        fetchMock.putOnce('/tasks'+_id, 200);

        const expectedActions = [
            { type: 'TASK_EDITING' },
            { type: 'TASK_EDITED', payload: expect.any(Object)}
        ];


        return store.dispatch(actions.RequestEditTask(_id,detailTask)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })
})