import { connect } from 'react-redux';
import Repository from './Repository';

const mapStateToProps = (state, ownProps) => {
    let gitHubUsers = state.users.gitHubUsers || {};
    let gitHubUser = gitHubUsers[ownProps.match.params.user] || {};
    let user = gitHubUser.user || {};
    let repositories = user.repositories || [];

    let repository = repositories
        .filter(
            (repo) => repo.name === ownProps.match.params.repository
        )[0] || null;
    
    return {
        repository
    };
}

const mapDispatchToProps = () => ({
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Repository);