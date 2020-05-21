import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postElements = props.state.postData.map(obj => <Post id={obj.id} message={obj.message} likes={obj.likesCount}/>);
    
    let newPostText = React.createRef();

    let updatePostMessage = () => {
        props.updatePostMessage(newPostText.current.value)
    }
    
    let addPost = () => {
        props.addPost();
        newPostText.current.value = '';
    }

    return (
        <div className={classes.posts}>
            <h2>
                My posts
            </h2>
            <div className={classes.newPost}>
                <textarea onInput={updatePostMessage} name="" className={classes.newPostText} ref={newPostText} cols="30" rows="10">

                </textarea>
                <button onClick={addPost}>
                    Add post
                </button>
            </div>
            <div className={classes.postList}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts;