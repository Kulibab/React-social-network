import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <div className={classes.postContent}>
                <img src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/38/1505816350-screen-shot-2017-09-19-at-111641.jpg?crop=0.502xw:1.00xh;0.0952xw,0&resize=480:*' alt='lala' />
                <p className={classes.postText}>
                    {props.message}
                </p>
            </div>
            <div className={classes.likes}>
                <i className="far fa-heart"></i><span className={classes.likesAmount}>{props.likes}</span>
            </div>
        </div>
    )
}

export default Post;