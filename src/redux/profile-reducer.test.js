const { default: profileReducer, addPostActionCreator, deletePostActionCreator } = require("./profile-reducer");

let state = {
    postData: [
        {id: 1, message: "it's my first post", likesCount: 40},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: "lalala", likesCount: 10}
    ]
};

it ('add new post length', () => {
    let newState = profileReducer(state, addPostActionCreator('new message'));
    
    expect(newState.postData.length).toBe(4);
});

it ('add new post text', () => {
    let newState = profileReducer(state, addPostActionCreator('new message'));

    expect(newState.postData[3].message).toBe('new message');
});

it ('add new post length likes count', () => {
    let newState = profileReducer(state, addPostActionCreator('new message'));

    expect(newState.postData[3].likesCount).toBe(0);
});

it ('delete post length', () => {
    let newState = profileReducer(state, deletePostActionCreator(1));
    
    expect(newState.postData.length).toBe(2);
});
