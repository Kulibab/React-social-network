import React from 'react';
import classes from './DialogItem.module.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={classes.dialog}>
            <NavLink to={path}>
                <img src={props.logoSrc} alt="ava" className={classes.avatar} />
                <p>{props.name}</p>
            </NavLink>
        </div>
    )
}

export default DialogItem;