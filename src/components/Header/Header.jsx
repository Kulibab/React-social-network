import React from 'react';
import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
          <span className={classes.logo}>CSN</span>
          <span className={classes.description}>cartoon social network</span>
      </header>
    )
}

export default Header;