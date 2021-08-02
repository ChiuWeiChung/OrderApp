import React from 'react';
import classes from './CostColumn.module.css';
// import { NavLink } from 'react-router-dom'
function CostColumn(props) {
    let list = (
        <p>購物車目前沒有品項</p>
    )

    let checkoutButton = null;

    if (props.order.cartList.length) {
        checkoutButton = (
            <div onClick={props.checkoutButton} className={classes.CheckoutButton} >{props.auth.token?null:'登入並'}結帳</div>
        )
    }

    let style = [classes.Cost];
    if (props.showColumn) {
        style = style.concat(classes.Show).join(' ');
    }


    if (props.order.cartList.length) {
        list = props.order.cartList.map(el => {
            return (
                <div key={el.id} className={classes.Cost__List__Item}>
                    <div className={classes.Item__Detail} >
                        <div>{el.name}</div>
                        <div>{el.number}</div>
                        <div>{el.price * el.number}</div>
                    </div>
                    <div className={classes.Modified} >
                        <button onClick={() => props.onChoose(el)}>修改</button>
                        <button onClick={() => props.onRemove(el.name)}>移除</button>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={style}>
            <div className={classes.Cross} onClick={props.columnController}></div>
            <h3>您的購物車</h3>
            <div className={classes.Cost__ItemName}>
                <div>品項</div>
                <div>數量</div>
                <div>總價</div>
            </div>
            <div className={classes.Cost__List}>
                {list}
            </div>
            {checkoutButton}

        </div>
    )
}

export default CostColumn