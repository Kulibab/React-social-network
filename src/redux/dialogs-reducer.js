const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogData: [
        {id: 1,name: 'Denys', logoSrc:'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/38/1505816350-screen-shot-2017-09-19-at-111641.jpg?crop=0.502xw:1.00xh;0.0952xw,0&resize=480:*'},
        {id: 2,name: 'Maryna',logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/e8/Jessica.png/revision/latest/scale-to-width-down/310?cb=20150706222334'},
        {id: 3,name: 'Frenk', logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/eb/Talkingcat.png/revision/latest?cb=20200110192710'}
    ],
    messageData: [
        {id: 1, text: 'Hello', dir: 'send', time: '21:35'},
        {id: 2, text: 'Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla', dir: 'get', time: '21:38'},
        {id: 3, text: 'Lalka', dir: 'send', time: '22:11'}
    ],
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            };

        case SEND_MESSAGE:
            let newMessage = {
                id: state.messageData.length+1,
                text: state.newMessageText,
                dir: 'send',
                time: new Date().toLocaleTimeString().slice(0, 5)
            }
            return {
                ...state,
                newMessageText: '',
                messageData: [...state.messageData, newMessage]
            };

        default:
            return state;
    }
}

export const sendMessageActionCreator = () => ({
    type: SEND_MESSAGE
});

export const updateMessageTextActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
});

export default dialogsReducer;