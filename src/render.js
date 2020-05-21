import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost} from './components/redux/state';
import {BrowserRouter} from 'react-router-dom';
import {updatePostMessage} from './components/redux/state';

 export let renderEnrireTree = (state) =>  {
    ReactDOM.render(
  <BrowserRouter>
    <App state={state} addPost={addPost} updatePostMessage={updatePostMessage}/>
  </BrowserRouter>,
  document.getElementById('root')
);
}

