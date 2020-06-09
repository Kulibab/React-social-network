import React from 'react';
import classes from './Users.module.css'
import photo from '../../assets/images/photo.png';
import { NavLink } from 'react-router-dom';
import {usersAPI} from '../../api/api';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.pages}>
                {pages.map(p => {
                    return <span key={p}
                        onClick={() => {
                            props.onPageChanged(p);
                        }}
                        className={props.currentPage === p ? classes.selectPage : ''}>{p}</span>
                })}
            </div>
            {
                props.usersData.map(user => {
                    return <div key={user.id} className={classes.user}>
                        <div className={classes.follow}>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small || photo} className={classes.ava} alt='obama' />
                                </NavLink>
                            </div>
                            <div>
                                {user.followed 
                                    ? <button className={classes.btn} onClick={() => {  
                                        usersAPI.unfollow(user.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.unfollow(user.id);
                                                }
                                            });                                    
                                    }}>Unfollow</button> 
                                    : <button className={classes.btn} onClick={() => {
                                        usersAPI.follow(user.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.follow(user.id);
                                                }
                                            });  

                                        
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
                })
            }
        </div>
    )
}

export default Users;