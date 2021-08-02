import React from 'react';
import classes from './OrderDetail.module.css';
function OrderDetail(props) {
    let style = classes.Detail;
    let plusIcon = classes.PlusIcon;
    let minusIcon = classes.MinusIcon;

    if (props.order.showDetail) style = style.concat(` ${classes.Show}`);
    if(props.order.currentItem.number<=1 ) minusIcon=minusIcon.concat(` ${classes.Disabled}`);
    if(props.order.currentItem.number>=10 ) plusIcon=plusIcon.concat(` ${classes.Disabled}`);
    
    return (
        <div className={style} style={{backgroundImage:`linear-gradient(45deg, rgb(8 5 5 / 60%), rgb(5 5 5 / 80%)),url(${props.order.currentItem.url})`}} >
            <div>{props.order.currentItem.name}</div>
            <div className={classes.Selector}>
                <div className={minusIcon} onClick={() => props.onChange(false)}><i className="fas fa-minus-circle"></i> </div>
                <div>{props.order.currentItem.number}</div>
                <div className={plusIcon} onClick={() => props.onChange(true)}> <i className="fas fa-plus-circle"></i> </div>
            </div>
            <div>$NT{props.order.currentItem.number*props.order.currentItem.price}</div>
            <div className={classes.Buttongroup}>
                <button className={classes.Button__Success} onClick={() => props.onAdd(props.order.currentItem)}>加入購物車</button>
                <button className={classes.Button__Danger} onClick={props.cancelButton}>取消</button>
            </div>
        </div>
    )
}

export default OrderDetail;