import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../../services/actions';
import User from './User';

const mapStateToProps = (state, ownProps) => {
    let gitHubUsers = state.users.gitHubUsers || {};
    let gitHubUser = gitHubUsers[ownProps.match.params.user];
    return {
        gitHubUser
    };
}

const mapDispatchToProps = dispatch => ({
    fetchUserIfNeeded: (username) => dispatch(fetchUserIfNeeded(username))
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(User);