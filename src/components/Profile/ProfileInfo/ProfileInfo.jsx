import React from 'react';
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={classes.top_img} src='https://www.scadconnector.com/wp-content/uploads/2015/10/editRick-and-Morty-2.jpg' alt='profile-pic' />
            </div>
            <div className={classes.description}>
                <img className={classes.avatar} src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/38/1505816350-screen-shot-2017-09-19-at-111641.jpg?crop=0.502xw:1.00xh;0.0952xw,0&resize=480:*' alt='avatar' />
            </div>
        </div>

    )
}

export default ProfileInfo;