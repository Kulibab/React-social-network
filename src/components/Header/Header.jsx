import React from 'react';
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={classes.header}>
          <span className={classes.logo}>CSN</span>
          <span className={classes.description}>cartoon social network</span>
          <div className={classes.loginBlock}>
              {props.isAuth 
                ? <div>{props.login} - <button onClick={props.setUserLogout}>logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
          </div>
      </header>
    )
}

export default Header;