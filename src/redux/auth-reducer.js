import {authAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                captcha: false
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state;
    }
};

export const authUserDataSuccess = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login,
            isAuth
        }
    }
};

const setCaptcha = (url) => {
    return {
        type: SET_CAPTCHA,
        captcha: url
    }
}

// thunx

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(authUserDataSuccess(id, email, login, true));
            }
        });
    }
}

export const setUserLogin = (data) => {

    return (dispatch) => {
        authAPI.setLogin({
            email: data.login,
            password: data.password,
            captcha: data.captcha
        })
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                if(data.resultCode === 10) {
                    authAPI.getCaptcha()
                    .then(data => dispatch(setCaptcha(data.url)))
                }
                debugger;
                let message = (data.messages[0]) ? data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
        })
    }
}

export const setUserLogout = () => {
    return (dispatch) => {
        authAPI.setLogout()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(authUserDataSuccess(null, null, null, false));
            }
        })
    }
}


export default authReducer;