import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import users from '../services/reducers/users';

let middlewares = [thunkMiddleware]
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
}
const buildStore = () => createStore(
    combineReducers({
        users
    }),
    applyMiddleware (...middlewares)
);

export default buildStore;