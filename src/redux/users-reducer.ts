import {usersAPI} from '../api/api';
import { photosType } from '../types/types';
import { updateObjInArray } from '../utils/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

type userType = {
  id: number
  name: string
  status: string
  photos: photosType
}

let initialState = {
    usersData: [] as Array<userType>,
    pageSize: 20,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [] as Array<number>,
    portionSize: 10,
};

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
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

type followSuccessType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): followSuccessType => {
    return {
        type: FOLLOW,
        userId
    }
};

type unfollowSuccessType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessType => {
    return {
        type: UNFOLLOW,
        userId
    }
};

type setUsersType = {
  type: typeof SET_USERS
  users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersType => {
    return {
        type: SET_USERS,
        users
    }
}

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
export const setTotalUsersCount = (count: number): setTotalUsersCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: count
    }
}

type setIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type toggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFollowingInProgress: boolean
  userId: number
}
export const toggleFollowingProgress = (isFollowingInProgress: boolean, userId: number): toggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFollowingInProgress,
        userId
    }
}

//functions

const followUnfolowFlow = async (dispatch: any, userId: number, apiMethod: any, AC: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId)
            if (data.resultCode === 0) {
                dispatch(AC(userId));
            }
        dispatch(toggleFollowingProgress(false, userId));
}


// thunx

export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    let response = await usersAPI.getUsers(page, pageSize)
             dispatch(setUsers(response.items));
             dispatch(setTotalUsersCount(response.totalCount));
             dispatch(setIsFetching(false));
    }
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}
 
export default usersReducer;