import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls';

const MyPosts = (props) => {
    let postElements = props.postData.map(obj => <Post id={obj.id} message={obj.message} likes={obj.likesCount} key={obj.id} />);

    let onAddPost = (values) => {
        props.addPost(values.addPostForm);
    }

    return (
        <div className={classes.posts}>
            <h2 className={classes.title}>
                My posts
            </h2>
            <MyPostsFormRedux onSubmit={onAddPost} />
            <div className={classes.postList}>
                {postElements}
            </div>
        </div>
    )
}

const maxLength400 = maxLengthCreator(400);

const MyPostsForm = (props) => {
    return (
    <form className={classes.newPost} onSubmit={props.handleSubmit}>
        <Field className={classes.newPostText}
            component={Textarea}
            cols="30" rows="10"
            name={'addPostForm'}
            validate={[required, maxLength400]}
            onKeyPress={(ev) => {
                if (!ev.shiftKey && ev.charCode === 13) {
                    props.handleSubmit()
                }
            }
        }/>
        <button type='submit' className={classes.btn}>
            Add post
                </button>
    </form>)
}

const MyPostsFormRedux = reduxForm({form: 'addPostForm'})(MyPostsForm);

export default MyPosts;