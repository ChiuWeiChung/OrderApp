import React from 'react';
import classes from './Hamburger.module.css';
function hamburger(props) {
    return (
        <div className={classes.Hamburger__Container} onClick={props.clicked}>
            <div className={classes.Hamburger} >
            </div>
        </div>
    )
}


export default hamburger