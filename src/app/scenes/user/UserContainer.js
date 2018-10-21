import { connect } from 'react-redux';
import { fetchUser, fetchUserIfNeeded } from '../../services/actions';
import User from './User';

const mapStateToProps = (state, ownProps) => {
    let gitHubUsers = state.users.gitHubUsers || {};
    let gitHubUser = gitHubUsers[ownProps.match.params.user];
    return {
        gitHubUser
    };
}

const mapDispatchToProps = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchUserIfNeeded: (username) => dispatch(fetchUserIfNeeded(username))
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(User);