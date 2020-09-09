import {authAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';

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

export const getAuthUserData = () => async (dispatch) => {
        let response = await authAPI.getAuth();

        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(authUserDataSuccess(id, email, login, true));
        }
    }

export const setUserLogin = (data) => async (dispatch) => {

        let response = await authAPI.setLogin({
            email: data.login,
            password: data.password,
            captcha: data.captcha
        })

        if (response.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (response.resultCode === 10) {
                authAPI.getCaptcha()
                    .then(response => dispatch(setCaptcha(response.url)))
            }
            let message = (response.messages[0]) ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {
                _error: message
            }));
        }
}

export const setUserLogout = () => async (dispatch) => {

        let response = await authAPI.setLogout()

            if(response.resultCode === 0) {
                dispatch(authUserDataSuccess(null, null, null, false));
            }
}


export default authReducer;