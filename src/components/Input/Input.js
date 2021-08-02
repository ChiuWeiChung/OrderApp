import React from 'react';
import classes from './Input.module.css';

function input(props) {
    const inputClasses = [classes.InputElement];
    const labelStyle = [classes.Label];

    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    } else if (props.valid && props.touched) {
        inputClasses.push(classes.Valid);
        labelStyle.push(classes.Fixed);
    }

    let inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        required
        onChange={props.changed}
    />;

    return (
        <div className={classes.Input}>
            {inputElement}
            <label className={labelStyle.join(' ')} >{props.elementConfig.placeholder}</label>
        </div>
    )
}

export default input;