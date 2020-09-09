import React from 'react';
import classes from './Users.module.css'
import photo from '../../assets/images/photo.png';
import { NavLink } from 'react-router-dom';


let User = ({user, isFollowingInProgress, unfollow, follow}) => {

    return (
        <div key={user.id} className={classes.user}>
                        <div className={classes.follow}>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small || photo} className={classes.ava} alt='obama' />
                                </NavLink>
                            </div>
                            <div>
                                {user.followed 
                                    ? <button disabled={isFollowingInProgress.some(id => id === user.id)} 
                                    className={classes.btn} onClick={() => {
                                        unfollow(user.id)                                 
                                    }}>Unfollow</button> 
                                    : <button disabled={isFollowingInProgress.some(id => id === user.id)} 
                                    className={classes.btn} onClick={() => {
                                        follow(user.id) 
                                    }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div className={classes.username}>
                            <p className={classes.marginBottom}>
                                {user.name}
                            </p>
                            <p>
                                {user.status}
                            </p>
                        </div>
                        <div className={'classes.location'}>
                            <p className={classes.marginBottom}>
                                {'user.location.country'}
                            </p>
                            <p>
                                {'user.location.city'}
                            </p>
                        </div>
                    </div>
    )
}

export default User;