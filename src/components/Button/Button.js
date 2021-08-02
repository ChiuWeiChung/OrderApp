import React from 'react';
import classes from './Button.module.css';
const button = (props) => {
    let buttonStyle = [classes.Button];
    if (props.fullWidth) buttonStyle.push(classes.FullWidth);
    if (props.btnType) buttonStyle.push(classes[props.btnType])


    let style = buttonStyle.join(' ');
    return (
        <button
            disabled={props.disabled}
            className={style}
            onClick={props.clicked}>
            {props.children}
        </button>
    )
}

export default button