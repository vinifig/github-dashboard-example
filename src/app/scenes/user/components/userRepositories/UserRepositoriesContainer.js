import { connect } from 'react-redux';
import UserRepositories from './UserRepositories';

const mapStateToProps = (state, ownProps) => {
    let gitHubUsers = state.users.gitHubUsers || {};
    let gitHubUser = gitHubUsers[ownProps.match.params.user] || {};
    let user = gitHubUser.user || {};
    let repositories = user.repositories || {};
    return {
        repositories
    };
}

const mapDispatchToProps = () => ({
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(UserRepositories);