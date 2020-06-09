import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer'
import {profileAPI} from '../../api/api';
import {withRouter} from 'react-router';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId||2;
        profileAPI.getProfile(userId)
        .then(data => {
            this.props.setUserProfile(data);
        });
    }

    render () {
    return (
        <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    )
    }
}

let mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile
    }
)

let withUrlDataProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile}) (withUrlDataProfileContainer);