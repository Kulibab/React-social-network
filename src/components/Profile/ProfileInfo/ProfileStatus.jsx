import React, { useState, useEffect } from 'react';
import classes from './ProfileInfo.module.css';

function ProfileStatus (props) {

    let [status, changeStatus] = useState(props.status);
    let [editMode, changeEditMode] = useState(false);

    useEffect(() => {
        changeStatus(props.status);
    }, [props.status]);

        return (
            <div>
                {!editMode
                ?   <div>
                        <span onDoubleClick={() => changeEditMode(true)} className={classes.status}>{status || '-----'}</span>
                    </div>
                :   <div>
                        <input value={status}
                            onBlur={() => {
                                props.updateUserStatus(status)
                                changeEditMode(false)
                            }}
                            onChange={(e) => {
                                changeStatus(e.currentTarget.value);
                            }}
                            autoFocus={true} />
                    </div>
                }
            </div>
    
        )
}

export default ProfileStatus;