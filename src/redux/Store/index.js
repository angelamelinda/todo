import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import AllReducer from '../Reducer';
import { RequestGetAllTask } from '../Action/action_todo';

const Store = createStore(AllReducer,
  applyMiddleware(thunkMiddleware,
    logger
  )
);

Store.dispatch(RequestGetAllTask());
export default Store;
