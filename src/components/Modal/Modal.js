import classes from './Modal.module.css';
import React from 'react';
import Aux from '../../hoc/auxiliary';
import Backdrop from '../Backdrop/Backdrop';


function modal(props) {

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
            <div
                className={classes.Modal}
                style={{
                    opacity: props.show ? '1' : '0',
                    visibility: props.show ? 'visible' : 'hidden'
                }}
            >
                {props.children}
            </div>

        </Aux>
    )
}

export default modal