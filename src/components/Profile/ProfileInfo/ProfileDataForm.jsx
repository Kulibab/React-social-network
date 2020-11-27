
import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';

import classes from './ProfileInfo.module.css';

const ProfileDataForm = ({ handleSubmit, error }) => {
    return <form className={classes.info} onSubmit={handleSubmit}>
        <div className={classes.name}>
            <b>Full name: </b>{createField('Full name', 'fullName', [], Input)}
        </div>
        <div className={classes.about}>
            <b>About me: </b>{createField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div className={classes.lookJob}>
            <b>Looking for a job: </b>{createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>
        <div className={classes.jobDescription}>
            <b>My professional skills: </b>{createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <h2>Contacts:</h2>
            <b>facebook: </b>{createField('', 'contacts.facebook', [], Input)}
            <b>website: </b>{createField('', 'contacts.website', [], Input)}
            <b>vk: </b>{createField('', 'vk', [], Input)}
            <b>twitter: </b>{createField('', 'contacts.twitter', [], Input)}
            <b>instagram: </b>{createField('', 'contacts.instagram', [], Input)}
            <b>youtube: </b>{createField('', 'contacts.youtube', [], Input)}
            <b>github</b>{createField('', 'contacts.github', [], Input)}
            <b>mainLink: </b>{createField('', 'contacts.mainLink', [], Input)}
        </div>
        {error && <div className={classes.errorBox}>{error}</div>}
        <button>Save</button>
    </form>
}

export default reduxForm({ form: 'edit-profile' })(ProfileDataForm);