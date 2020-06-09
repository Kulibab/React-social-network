import React from 'react';
import classes from './FriendsOnline.module.css';
import Friend from './Friend/Friend';

const FriendsOnline = (props) => {
    return (
        <div className={classes.friendOnline}>
            <h2 className={classes.title}>
                Friends online
            </h2>
            {props.friendsOnline.map((obj) => <Friend logoSrc={obj.logoSrc} name={obj.name} key={obj.id}/>)}
        </div>
    )
}

export default FriendsOnline