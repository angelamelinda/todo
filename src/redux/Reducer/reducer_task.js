export const initialState = { isFetching: false, isFetched: false, isAdding: false, isAdded: false, isEditing: false, isEdited: false, isDeleting: false, isDeleted: false, listTask: {} }

export default function Task(state = initialState, action) {
  switch (action.type) {
    case 'TASK_FETCHING':
      return {...state, isFetching: true, isFetched: false}
    case 'TASK_FETCHED':
      return {...state, isFetching: false, isFetched: true, listTask: action.payload}
    case 'TASK_ADDING':
      return {...state, isAdding: true, isAdded: false}
    case 'TASK_ADDED':
      return {...state, isAdding: false, isAdded: true, listTask: action.payload}
    case 'TASK_EDITING':
      return {...state, isEditing: true, isEdited: false}
    case 'TASK_EDITED':
      return {...state, isEditing: false, isEdited: true, listTask: action.payload}
    case 'TASK_DELETING':
      return {...state, isDeleting: true, isDeleted: false}
    case 'TASK_DELETED':
      return {...state, isDeleting: false, isDeleted: true, listTask: action.payload}
    default:
      return state
  }
}
