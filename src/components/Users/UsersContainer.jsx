import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching } from '../../redux/users-reducer';
import Users from './Users';
import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
       usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount)
                this.props.setIsFetching(false);
            });
    }

    onPageChanged = (p) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(p);
        usersAPI.getUsers(p, this.props.pageSize).then(data => {
                this.props.setUsers(data.items)
                this.props.setIsFetching(false);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                usersData={this.props.usersData}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching })(UsersContainer);