import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import photo from '../../../assets/images/photo.png';


const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img className={classes.top_img} src='https://www.scadconnector.com/wp-content/uploads/2015/10/editRick-and-Morty-2.jpg' alt='profile-pic' />
            </div>
            <div className={classes.profile}>
                <img className={classes.avatar} src={props.profile.photos.large || photo} alt='avatar' />
                <div className={classes.info}>
                    <p className={classes.name}>
                        {props.profile.fullName}
                    </p>
                    <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
                    <p className={classes.about}>
                        {props.profile.aboutMe}
                    </p>
                    <p className={classes.lookJob}>
                        Looking for a job: {props.profile.lookingForAJob ? 'Yes' : 'No'}
                    </p>
                    <p className={classes.jobDescription}>
                        {props.profile.lookingForAJobDescription}
                    </p>
                </div>
                <div className={classes.links}>
                </div>
            </div>
        </div>

    )
}

// https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/38/1505816350-screen-shot-2017-09-19-at-111641.jpg?crop=0.502xw:1.00xh;0.0952xw,0&resize=480:*

export default ProfileInfo;