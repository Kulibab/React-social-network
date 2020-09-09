import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login'
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
              <HeaderContainer />
              <NavBar />
              <div className='app-wrapper-content'>
                  <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                  <Route path='/dialogs' render={() => <DialogsContainer />} />
                  <Route path='/users' render={() => <UsersContainer />} />
                  <Route path='/news' component={News}/>
                  <Route path='/music' component={Music}/>
                  <Route path='/settings' component={Settings}/>
                  <Route path='/login' component={Login}/>
              </div>
            </div>
        );
    }
  
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp = (props) => {
    return   <BrowserRouter>
    <Provider store={store}>
        <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;