import React from 'react';
import classes from './Friend.module.css';

const Friend = (props) => {
    return (
        <div className={classes.friend}>
            <img src={props.logoSrc} alt="ava" className={classes.avatar} />
            <p className={classes.name}>
                {props.name}
            </p>
        </div>
    )
}

export default Friend