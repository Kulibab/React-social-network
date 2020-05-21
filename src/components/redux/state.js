import {renderEnrireTree} from '../../render';

let state = {
    profilePage: {
        postData: [
            {id: 1, message: "it's my first post", likesCount: 40},
            {id: 2, message: 'How are you?', likesCount: 15},
            {id: 3, message: "lalala", likesCount: 10}
        ]
    },
    messagePage: {
        dialogData: [
            {id: 1,name: 'Denys', logoSrc:'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/38/1505816350-screen-shot-2017-09-19-at-111641.jpg?crop=0.502xw:1.00xh;0.0952xw,0&resize=480:*'},
            {id: 2,name: 'Maryna',logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/e8/Jessica.png/revision/latest/scale-to-width-down/310?cb=20150706222334'},
            {id: 3,name: 'Frenk', logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/eb/Talkingcat.png/revision/latest?cb=20200110192710'}
        ],
        messageData: [
            {id: 1, text: 'Hello', dir: 'send', time: '21:35'},
            {id: 2, text: 'Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla', dir: 'get', time: '21:38'},
            {id: 3, text: 'Lalka', dir: 'send', time: '22:11'}
        ]
    },
    FriendsOnlinePage: [
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2017/02/%D0%9A%D0%BE%D0%B2%D0%B1%D0%BE%D0%B9-%D0%A0%D0%B8%D0%BA-%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BB%D0%B0%D0%BD.jpg' ,name: 'Rick'},
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2016/11/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%8C-%D0%9F%D0%BB%D1%83%D1%82%D0%BE%D0%BD%D0%B0.jpg' ,name: 'King Plutie'},
        {logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/ec/%D0%9E%D0%B3%D1%83%D1%80%D1%87%D0%B8%D0%BA_%D0%A0%D0%B8%D0%BA_002.jpg/revision/latest/scale-to-width-down/340?cb=20170808193211&path-prefix=ru' ,name:'Cucumber'},
        {logoSrc:'https://pbs.twimg.com/profile_images/640562675307708416/XGzlRdo9_400x400.png' ,name: 'Bird'},
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2016/09/%D0%92%D0%BE%D1%80%D0%BE%D0%B2%D0%B0%D0%B9%D1%87%D0%B8%D0%BA.jpg' ,name:'Creep' }
    ]
}

let postMessage;

export let updatePostMessage = (text) => {
    postMessage = text;
}

export let addPost = () => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };

    state.profilePage.postData.push(newPost);
    renderEnrireTree(state);
}

export default state;