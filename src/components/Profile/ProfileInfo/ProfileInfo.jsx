import React from 'react';
import classNames from 'classnames';

import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import photo from '../../../assets/images/photo.png';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, savePhoto, isOwner, status, updateUserStatus, saveProfile }) => {
    const [ editMode, setEditMode ] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = e => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
       saveProfile(formData)
       .then(() =>  setEditMode(false))
    }

    return (
        <div>
            <div>
                <img className={classes.top_img} src='https://www.scadconnector.com/wp-content/uploads/2015/10/editRick-and-Morty-2.jpg' alt='profile-pic' />
            </div>
            <div className={classes.profile}>
                <div className={classes.avatarContainer}>
                    <img className={classes.avatar} src={profile.photos.large || photo} alt='avatar' />
                    {isOwner && <label htmlFor="upload-avatar" className={classes.uploadLabel}>choose photo</label>}
                    <input type="file" id="upload-avatar" className={classes.fileInput} onChange={e => onMainPhotoSelected(e)} />
                </div>
                {editMode && <ProfileDataForm initialValues={profile} setEditMode={setEditMode} onSubmit={onSubmit}/>}
                {!editMode && <ProfileData profile={profile} status={status} updateUserStatus={updateUserStatus} isOwner={isOwner} setEditMode={setEditMode}/>}
                <div className={classes.links}>
                    {Object.entries(profile.contacts).filter(([name, ref]) => ref).map(([name, ref], ind) => {
                        return <a className={classNames(classes.contact, classes[name])} href={ref} key={ind}>
                        </a>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;

const ProfileData = ({ profile, status, updateUserStatus, isOwner, setEditMode }) => {

    return <div className={classes.info}>
        <p className={classes.name}>
            {profile.fullName}
        </p>
        <ProfileStatus status={status} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
        <p className={classes.about}>
            {profile.aboutMe}
        </p>
        <p className={classes.lookJob}>
            Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}
        </p>
        <p className={classes.jobDescription}>
            {profile.lookingForAJobDescription}
        </p>
        {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
    </div>
}
