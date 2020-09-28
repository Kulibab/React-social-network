export const getUsersData = (state) => {
    return state.usersPage.usersData;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getIsFollowingInProgress = (state) => {
    return state.usersPage.isFollowingInProgress;
}

export const getPortionSize = (state) => {
    return state.usersPage.portionSize;
}
