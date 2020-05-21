import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
    let newMessageText = React.createRef();

    let sendMessage = () => {
        let text = newMessageText.current.value;
        alert(text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {props.state.dialogData.map(obj => <DialogItem id={obj.id} name={obj.name} logoSrc={obj.logoSrc}/>)}
            </div>
            <div className={classes.dialogMessages}>
                <div className={classes.messages}>
                    {props.state.messageData.map(obj => <Message id={obj.id} text={obj.text} dir={obj.dir} time={obj.time}/>)}
                </div>
                <div className={classes.sendBtn} onClick={sendMessage}>
                <i class="far fa-paper-plane"></i>
                </div>
                <textarea className={classes.newMessage} ref={newMessageText} cols="30" rows="10"></textarea>
            </div>

        </div>
    )
}

export default Dialogs;