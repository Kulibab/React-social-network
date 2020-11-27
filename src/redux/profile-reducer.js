import { stopSubmit } from 'redux-form';
import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    postData: [
        {id: 1, message: "it's my first post", likesCount: 40},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: "lalala", likesCount: 10}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action, error) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postData.length+1,
                message: action.postText,
                likesCount: 0
            };
        
            return {
                ...state,
                postMessage: '',
                postData: [...state.postData, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(el => el.id !== action.id)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default: 
            return state;
    }
}

export const addPostActionCreator = (postText) => ({
    type: ADD_POST,
    postText
});

export const deletePostActionCreator = (id) => ({
    type: DELETE_POST,
    id
});

export const setUserProfileSuccess = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
});

export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
})

// thunx

export const setUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileSuccess(response));
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response));
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (photo) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(photo)
        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos));
        }
    }
}

export const saveProfile = (formData) => {
    return async (dispatch, getState) => {
        const id = getState().auth.userId;
        let response = await profileAPI.saveProfile(formData);
        if (response.resultCode === 0) {
            dispatch(setUserProfile(id));
        } else {
            let message = (response.messages[0]) ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('edit-profile', {
                _error: message
            }));
            return Promise.reject(response.messages[0]);
        }
    }
}

export default profileReducer;