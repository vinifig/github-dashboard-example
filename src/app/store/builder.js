import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import users from '../services/reducers/users';

const buildStore = () => createStore(
    combineReducers({
        users
    }),
    applyMiddleware (
        thunkMiddleware,
        loggerMiddleware
    )
);

export default buildStore;