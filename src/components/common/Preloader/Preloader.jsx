import React from 'react';
import preloader from '../../../assets/images/preloader.svg';
import classes from './Preloader.module.css';

const Preloader = (props) => {
    return <div className={classes.wrapper}>
        <img src={preloader} alt='preload'/>
    </div>
}

export default Preloader;