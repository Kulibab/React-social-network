import React, { useState } from 'react';
import classes from './Paginator.module.css'

let Paginator = ({ currentPage, totalUsersCount, pageSize, onPageChanged, portionSize }) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.pages}>
            {portionNumber > 10 && <span className={classes.paginatorBtn} onClick={() => {
                setPortionNumber(portionNumber - 10);
                onPageChanged((portionNumber - 11) * portionSize + 1);
            }}> -100 </span>}
            {portionNumber > 1 && <span className={classes.paginatorBtn} onClick={() => {
                setPortionNumber(portionNumber - 1);
                onPageChanged((portionNumber - 2) * portionSize + 1);
            }}> -10 </span>}
            {pages.filter((val) => val >= leftPortionPageNumber && val <= rightPortionPageNumber).map(p => {
                return <span key={p}
                    onClick={() => {
                        onPageChanged(p);
                    }}
                    className={currentPage === p ? classes.selectPage : ''}>{p}</span>
            })}
            {portionNumber < portionCount && <span className={classes.paginatorBtn} onClick={() => {
                setPortionNumber(portionNumber + 1)
                onPageChanged(portionNumber * portionSize + 1);
            }}> +10 </span>}
            {portionNumber < portionCount - 10 && <span className={classes.paginatorBtn} onClick={() => {
                setPortionNumber(portionNumber + 10)
                onPageChanged((portionNumber + 9) * portionSize + 1);
            }}> +100 </span>}
        </div>
    )
}

export default Paginator;