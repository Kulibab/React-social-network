import React from 'react';
import classes from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User';

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, portionSize, ...props}) => {

    return (
        <div className={classes.wrapper}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
            totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} />
            {
                props.usersData.map(user => {
                    return <User user={user} isFollowingInProgress={props.isFollowingInProgress} 
                    follow={props.follow} unfollow={props.unfollow} key={user.id}/>
                })
            }
        </div>
    )
}

export default Users;