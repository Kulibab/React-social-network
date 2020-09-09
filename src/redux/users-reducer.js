import {usersAPI} from '../api/api';
import { updateObjInArray } from '../utils/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    usersData: [],
    pageSize: 20,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjInArray(state.usersData, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjInArray(state.usersData, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                usersData: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                ? [...state.isFollowingInProgress, action.userId]
                : state.isFollowingInProgress.filter(id => id !== action.userId)

            }
        default:
            return state;
    }
};

export const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (count) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: count
    }
}

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleFollowingProgress = (isFollowingInProgress, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFollowingInProgress,
        userId
    }
}

//functions

const followUnfolowFlow = async (dispatch, userId, apiMethod, AC) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId)
            if (data.resultCode === 0) {
                dispatch(AC(userId));
            }
        dispatch(toggleFollowingProgress(false, userId));
}


// thunx

export const getUsers = (page, pageSize) => {
    return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    let response = await usersAPI.getUsers(page, pageSize)
             dispatch(setUsers(response.items));
             dispatch(setTotalUsersCount(response.totalCount));
             dispatch(setIsFetching(false));
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}
 
export default usersReducer;