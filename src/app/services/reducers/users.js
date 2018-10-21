import { combineReducers } from 'redux';
import { RECEIVE_USER, REQUEST_USER, FAILED_FETCH } from '../actions';

function users (
    state = {
        isFetching: false,
        hasFailed: false,
        user: {}
    },
    action
) {
    let isFetching = state.isFetching;
    let hasFailed = state.hasFailed;
    switch (action.type) {
        case REQUEST_USER:
            isFetching = true;
            hasFailed = false;
            return Object.assign({}, state, {isFetching, hasFailed});
        case FAILED_FETCH:
            isFetching = false;
            hasFailed = true;
            return Object.assign({}, state, {isFetching, hasFailed});
        case RECEIVE_USER:
            let user = action.user;
            isFetching = false;
            hasFailed = false;
            user.last_update = Date.now();
            return Object.assign({}, state, {isFetching, hasFailed, user});
        default:
            return state;
    }
}

function gitHubUsers (
    state = {

    },
    action
) {
    let { username } = action;
    switch (action.type) {
        case REQUEST_USER:
        case RECEIVE_USER:
        case FAILED_FETCH:
            return Object.assign({}, state, {
                [username]: users(state[username], action)
            });
        default:
            return state;

    }
}

const usersReducers = combineReducers({
    gitHubUsers
})

export default usersReducers;