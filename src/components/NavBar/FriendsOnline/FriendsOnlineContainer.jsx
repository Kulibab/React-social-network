import { connect } from 'react-redux';
import FriendsOnline from './FriendsOnline';

let mapStateToProps = (state) => {
    return {
        friendsOnline: state.sidebarPage.friendsOnline
    }
}

const FriendsOnlineContainer = connect(mapStateToProps)(FriendsOnline)

export default FriendsOnlineContainer