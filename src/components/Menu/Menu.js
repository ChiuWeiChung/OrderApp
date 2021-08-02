import React from 'react';
import classes from './Menu.module.css';
function Menu(props) {
    return (
        <div className={classes.Menu}>
            <div className={classes.List}>
                <div onClick={() => props.replacePage('/all')} className={classes.Item}>
                    <i className="fas fa-border-all"><span>全項</span> </i>
                </div>
                <div onClick={() => props.replacePage('/omelette')} className={classes.Item}>
                    <i className="fas fa-egg"><span>蛋餅</span></i>
                </div>
                <div onClick={() => props.replacePage('/toast')} className={classes.Item}>
                    <i className="fas fa-bread-slice"><span>吐司</span></i>
                </div>
                <div onClick={() => props.replacePage('/hamburger')} className={classes.Item}>
                    <i className="fas fa-hamburger"><span>漢堡</span></i>
                </div>
                <div onClick={() => props.replacePage('/dessert')} className={classes.Item}>
                    <i className="fas fa-stroopwafel"><span>輕食</span></i>
                </div>
                <div onClick={() => props.replacePage('/drinks')} className={classes.Item}>
                    <i className="fas fa-coffee"><span>飲品</span></i>
                </div>
            </div>
        </div>
    )
}

export default Menu;