import { connect } from 'react-redux';
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, getUsers, follow, unfollow} from '../../redux/users-reducer';
import Users from './Users';
import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getIsFollowingInProgress, getUsersData } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (p) => {
        this.props.getUsers(p, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                usersData={this.props.usersData}
                isFollowingInProgress={this.props.isFollowingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, {
    followSuccess, 
    unfollowSuccess, 
    setCurrentPage, 
    toggleFollowingProgress,
    getUsers,
    follow,
    unfollow
})(UsersContainer);