import React from 'react';
import classes from './ViewCart.module.css';

function viewCart(props) {
    let number = props.cartList.length ? (<span className={classes.Number}>{props.cartList.length}</span>) : null

    return (
        <div className={classes.ViewCart} onClick={props.columnController}>
            <div className={classes.Content}>
                <i className="fas fa-shopping-cart">
                    <span>檢視購物車</span>
                </i>
            </div>
            {/* <span className={classes.Number}>3</span> */}
            {number}
        </div>
    )
}


export default viewCart