import fetch from 'cross-fetch'

export const REQUEST_USER = 'REQUEST_USER';
export const requestUser = (username) => (
    {
        type: REQUEST_USER,
        username
    }
);

export const RECEIVE_USER = 'RECEIVE_USER';
export const receiveUser = ({username, user}) => (
    {
        type: RECEIVE_USER,
        username,
        user
    }
);

export const FAILED_FETCH = 'FAILED_FATCH';
export const failedFatch = ({username}) => (
    {
        type: FAILED_FETCH,
        username
    }
)

export const fetchUser = (username) => {
    return (dispatch) => {
        dispatch(requestUser(username));
        return fetch(`/api/user/${username.toString()}`)
            .then(response => response.json())
            .then(json => dispatch(receiveUser({username, user: json})))
            .catch(error => dispatch(failedFatch({username})));
    }
}

function shouldFetchUser (
    state = {
        users: {}
    },
    username
) {
    let users = state.users.gitHubUsers;
    let user = users[username];
    if (!user) {
        return true;
    }
    if (user.hasFailed) {
        return !user.isFetching;
    }
    return false;
}

export const fetchUserIfNeeded = (username) => {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState(), username)) {
            return dispatch(fetchUser(username));
        }
    }
}