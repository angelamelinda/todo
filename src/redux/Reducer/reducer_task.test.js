import reducer, { initialState } from './reducer_task';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle TASK_FETCHING then TASK_FETCHED', () => {
        expect(
            reducer(initialState, {
                type: 'TASK_FETCHING'
            })
        ).toEqual(
            {
                ...initialState,
                isFetching: true,
                isFetched: false
            }
        )

        expect(
            reducer(initialState, {
                type: 'TASK_FETCHED',
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                isFetching: false,
                isFetched: true,
                listTask: {}
            }
        )
    })

    it('should handle TASK_ADDING then TASK_ADDED', () => {
        expect(
            reducer(initialState, {
                type: 'TASK_ADDING'
            })
        ).toEqual(
            {
                ...initialState,
                isAdding: true,
                isAdded: false
            }
        )

        expect(
            reducer(initialState, {
                type: 'TASK_ADDED',
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                isAdding: false,
                isAdded: true,
                listTask: {}
            }
        )
    })
    it('should handle TASK_EDITING then TASK_EDITED', () => {
        expect(
            reducer(initialState, {
                type: 'TASK_EDITING'
            })
        ).toEqual(
            {
                ...initialState,
                isEditing: true,
                isEdited: false
            }
        )

        expect(
            reducer(initialState, {
                type: 'TASK_EDITED',
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                isEditing: false,
                isEdited: true,
                listTask: {}
            }
        )
    })
    it('should handle TASK_DELETING then TASK_DELETED', () => {
        expect(
            reducer(initialState, {
                type: 'TASK_DELETING'
            })
        ).toEqual(
            {
                ...initialState,
                isDeleting: true,
                isDeleted: false
            }
        )

        expect(
            reducer(initialState, {
                type: 'TASK_DELETED',
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                isDeleting: false,
                isDeleted: true,
                listTask: {}
            }
        )
    })
})