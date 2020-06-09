import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
    let newMessageText = React.createRef();

    let onSendMessage = (ev) => {
        ev.preventDefault();
        props.sendMessage();
    }

    let onUpdateMessage = () => {
        let text = newMessageText.current.value;
        props.updateMessage(text);
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

                <form onSubmit={onSendMessage}>
                    <textarea className={classes.newMessage} 
                    ref={newMessageText} cols="30" rows="10"
                    onChange={onUpdateMessage} value={props.dialogsPage.newMessageText}
                    onKeyPress={(ev) => {
                        if (!ev.shiftKey && ev.charCode===13) {
                            onSendMessage(ev)
                            }
                        }
                    }
                    required>
                    </textarea>
                    <button type='submit' className={classes.sendBtn}>
                        <i className="far fa-paper-plane"></i>
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Dialogs;