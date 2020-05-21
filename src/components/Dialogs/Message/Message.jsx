import React from 'react';
import classes from './Message.module.css'

const Message = (props) => {
    return (
        <div className={`${classes[props.dir]} + ${classes.item}`}>
            {props.text}
            <span className={classes.time}>{props.time}</span>
        </div>
    )
}

export default Message;