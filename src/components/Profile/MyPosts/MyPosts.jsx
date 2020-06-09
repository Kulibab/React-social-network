import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postElements = props.profilePage.postData.map(obj => <Post id={obj.id} message={obj.message} likes={obj.likesCount} key={obj.id}/>);
    
    let newPostText = React.createRef();

    let onAddPost = (ev) => {
        ev.preventDefault();
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostText.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={classes.posts}>
            <h2 className={classes.title}>
                My posts
            </h2>
            <form className={classes.newPost}  onSubmit={onAddPost}>
                <textarea onChange={onPostChange} name="" className={classes.newPostText}
                 ref={newPostText} cols="30" rows="10" value={props.profilePage.postMessage}
                 onKeyPress={(ev) => {
                    if (!ev.shiftKey && ev.charCode===13) {
                        onAddPost(ev)
                        }
                    }
                }
                 required>
                </textarea>
                <button type='submit' className={classes.btn}>
                    Add post
                </button>
            </form>
            <div className={classes.postList}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts;