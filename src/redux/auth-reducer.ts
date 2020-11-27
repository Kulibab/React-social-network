import {authAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';

type ISType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captcha: boolean | string
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: false
};

const authReducer = (state = initialState, action: any): ISType => {
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
                captcha: action.captcha,
            }
        default:
            return state;
    }
};

type authUserDataSuccessDataType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type authUserDataSuccessType = {
  type: typeof SET_USER_DATA
  data: authUserDataSuccessDataType
}

export const authUserDataSuccess = (userId: null | number, email: null | string, login: null | string, isAuth: boolean): authUserDataSuccessType => {
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

type setCaptchaType = {
  type: typeof SET_CAPTCHA
  captcha: string
}

const setCaptcha = (url: string): setCaptchaType => {
    return {
        type: SET_CAPTCHA,
        captcha: url
    }
}

// thunx

export const getAuthUserData = () => async (dispatch: Function) => {
        let response = await authAPI.getAuth();

        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(authUserDataSuccess(id, email, login, true));
        }
    }

export const setUserLogin = (data: {login: string, password: string, captcha: string}) => async (dispatch: Function) => {

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
                    .then(r => dispatch(setCaptcha(r.url)))
            }
            let message = (response.messages[0]) ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {
                _error: message
            }));
        }
}

export const setUserLogout = () => async (dispatch: Function) => {

        let response = await authAPI.setLogout()

            if(response.resultCode === 0) {
                dispatch(authUserDataSuccess(null, null, null, false));
            }
}


export default authReducer;