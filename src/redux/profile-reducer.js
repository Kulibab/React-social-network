const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postData: [
        {id: 1, message: "it's my first post", likesCount: 40},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: "lalala", likesCount: 10}
    ],
    postMessage: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postData.length+1,
                message: state.postMessage.replace(),
                likesCount: 0
            };
            console.log(newPost.message.toString());
        
            return {
                ...state,
                postMessage: '',
                postData: [...state.postData, newPost]
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                postMessage: action.newText
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default: 
            return state;
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export default profileReducer;