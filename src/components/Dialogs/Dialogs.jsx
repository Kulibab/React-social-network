import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import {required, maxLengthCreator} from '../../utils/validators/validators'

const Dialogs = (props) => {

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {props.dialogsPage.dialogData.map(obj => <DialogItem id={obj.id} name={obj.name} logoSrc={obj.logoSrc} key={obj.id}/>)}
            </div>
            <div className={classes.dialogMessages}>
                <div className={classes.messages}>
                    {props.dialogsPage.messageData.map(obj => <Message id={obj.id} text={obj.text} dir={obj.dir} time={obj.time} key={obj.id}/>)}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

let maxLength30 = maxLengthCreator(30);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={classes.newMessage}
                component={Textarea}
                validate={[required, maxLength30]}
                name={'newMessageText'}
                cols="30" rows="10"
                onKeyPress={(ev) => {
                    if (!ev.shiftKey && ev.charCode === 13) {
                        props.handleSubmit()
                    }
                }
                }
                required/>
            <button className={classes.sendBtn}>
                <i className="far fa-paper-plane"></i>
            </button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;