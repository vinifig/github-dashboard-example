import React, {Component} from 'react';
import './GitHubForm.scss';

class GitHubForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
            username: ''
        };
    }

    onUserChange (e) {
        e.preventDefault();
        this.props.onUserChange(this.state.username);
    }

    handleChange (e) {
        e.preventDefault();
        this.setState(Object.assign(
            {}, 
            this.state, 
            {
                username: e.target.value
            }
        ));
    }

    componentDidMount () {

    }

    render () {
        let { className } = this.props;
        let wrappedUserChanged = this.onUserChange.bind(this);
        let wrappedHandleChange = this.handleChange.bind(this);
        return (
            <form onSubmit={wrappedUserChanged} className={`${className} GHForm`}>
                <input className="GHForm__input" value={this.state.username} onChange={wrappedHandleChange} type="text" placeholder="GitHub User"/>
                <button className="GHForm__button" type="submit">OK</button>
            </form>
        );
    }
}
  

export default GitHubForm;