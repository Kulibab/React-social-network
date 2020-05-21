import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';

function App(props) {
  return (
      <div className="app-wrapper">
        <Header />
        <NavBar state={props.state.FriendsOnlinePage} />
        <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <Profile 
                state={props.state.profilePage}
                addPost={props.addPost}
                updatePostMessage={props.updatePostMessage} />} />
            <Route path='/dialogs' render={() => <Dialogs 
                state={props.state.messagePage} />} />
            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
        </div>
      </div>
  );
}

export default App;
