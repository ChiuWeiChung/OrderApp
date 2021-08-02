import React from 'react';
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger';
import Aux from '../../hoc/auxiliary';

function Navbar(props) {
    let navStyle = [classes.Navigation];

    if (props.showNavbar) navStyle = navStyle.concat(classes.Show).join(' ');

    let linkLists = (<div onClick={props.setAuthRedirect}><NavLink to='/auth' ><i className="fas fa-sign-in-alt"><span>登入</span></i></NavLink></div>);
    let userInfo = null;

    if (props.auth.token) {
        userInfo = (<div>Hi {props.auth.userName}</div>);

        linkLists = (
            <Aux>
                <div ><NavLink to='/summary' ><i className="fas fa-cart-arrow-down"><span>我的訂單</span></i></NavLink></div>
                <div ><NavLink to='/checkout' ><i className="fas fa-cart-arrow-down"><span>結帳</span></i></NavLink></div>
                <div onClick={props.logout}><i className="fas fa-sign-out-alt"><span>登出</span> </i></div>
            </Aux>
        )
    }

    return (
        <div className={classes.Navbar}>
            <div className={classes.Title}>
                <NavLink to='/' >
                    <i className="fas fa-hamburger"></i>
                    <h2>Rick's Brunch</h2>
                </NavLink>
            </div>
            {userInfo}
            <div className={navStyle} >
                {linkLists}
            </div>
            <Hamburger clicked={props.toggler} />

        </div>
    )
}

export default Navbar