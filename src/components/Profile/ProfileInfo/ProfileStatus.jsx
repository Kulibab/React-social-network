import React, { useState, useEffect } from 'react';
import classes from './ProfileInfo.module.css';

function ProfileStatus ({status, isOwner, updateUserStatus}) {

    let [newStatus, changeStatus] = useState(status);
    let [editMode, changeEditMode] = useState(false);

    useEffect(() => {
        changeStatus(status);
    }, [status]);

        return (
            <div>
                {!editMode
                ?   <div>
                        <span onDoubleClick={() => isOwner && changeEditMode(true)} className={classes.status}>{newStatus || '-----'}</span>
                    </div>
                :   <div>
                        <input value={newStatus}
                            onBlur={() => {
                                updateUserStatus(newStatus)
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