import React from 'react';
import classes from './Paginator.module.css'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div  className={classes.pages}>
            {pages.map(p => {
                return <span key={p}
                    onClick={() => {
                        props.onPageChanged(p);
                    }}
                    className={props.currentPage === p ? classes.selectPage : ''}>{p}</span>
            })}
        </div>
    )
}

export default Paginator;