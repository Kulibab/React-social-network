import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setUserProfile, getUserStatus, updateUserStatus} from '../../redux/profile-reducer'
import {withRouter} from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
            if(!userId) {
                userId = this.props.authorizedUserId || this.props.history.push('/login');
            }
        this.props.setUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render () {
        return (
            <div>
                <Profile profile={this.props.profile} 
                    updateUserStatus={this.props.updateUserStatus} 
                    status={this.props.status}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
)

export default compose(
    connect(mapStateToProps, {setUserProfile, getUserStatus, updateUserStatus}),
    withRouter
)(ProfileContainer);