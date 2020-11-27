import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

type ISType = {
  initialized: boolean
}

let initialState: ISType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): ISType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

type initializedSuccessAT = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessAT => {
    return {
        type: INITIALIZED_SUCCESS
    }
};

// thunx

export const initializeApp = () => {
    return (dispatch: Function): void => {
        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(initializedSuccess())
        });
    }
}

export default appReducer;
