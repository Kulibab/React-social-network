import { stopSubmit } from 'redux-form';
import {profileAPI} from '../api/api';
import { photosType } from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type postType = {
  id: number
  message: string
  likesCount: number
}

type contactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

type profileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  photos: photosType
  contacts: contactsType
}


let initialState = {
    postData: [
        {id: 1, message: "it's my first post", likesCount: 40},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: "lalala", likesCount: 10}
    ] as Array<postType>,
    profile: null as profileType | null,
    status: '' as string,
    postMessage: '' as string,
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
                profile: {...state.profile, photos: action.photos} as profileType
            }
        default: 
            return state;
    }
}

type addPostActionCreatorType = {
  type: typeof ADD_POST
  postText: string
}
export const addPostActionCreator = (postText: string): addPostActionCreatorType => ({
    type: ADD_POST,
    postText
});

type deletePostActionCreatorType = {
  type: typeof DELETE_POST
  id: number
}
export const deletePostActionCreator = (id: number): deletePostActionCreatorType => ({
    type: DELETE_POST,
    id
});

type setUserProfileSuccessType = {
  type: typeof SET_USER_PROFILE
  profile: profileType
}
export const setUserProfileSuccess = (profile: any): setUserProfileSuccessType => ({
    type: SET_USER_PROFILE,
    profile
})

type setStatusType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): setStatusType => ({
    type: SET_STATUS,
    status
});

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

// thunx

export const setUserProfile = (userId: number) => {
    return async (dispatch: Function) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileSuccess(response));
    }
}

export const getUserStatus = (userId: number) => {
    return async (dispatch: Function) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response));
    }
}

export const updateUserStatus = (status: string) => {
    return async (dispatch: Function) => {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (photo: any) => {
    return async (dispatch: Function) => {
        let response = await profileAPI.savePhoto(photo)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos));
        }
    }
}

export const saveProfile = (formData: profileType) => {
    return async (dispatch: any, getState: any) => {
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