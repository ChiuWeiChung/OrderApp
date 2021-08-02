import React from 'react';
import ContactData from './ContactData/ContactData';
import classes from './CheckoutPage.module.css';
import Modal from '../../components/Modal/Modal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { initSpinner } from '../../store/actions/index';
import { navToggler } from '../../store/actions/index'
class Checkout extends React.Component {
    componentDidMount() {
        // if (this.props.showNavbar) this.props.navToggler();
        this.props.initSpinner();
    }

    redirect = () => {
        let redirectUrl = this.props.purchase ? '/summary' : '/';
        this.props.history.push(redirectUrl);
    }

    render() {
        let form = null;

        if (this.props.order.cartList.length) {
            let list = this.props.order.cartList.map(el => {
                return (
                    <div className={classes.Item} key={el.name}>
                        <div className={classes.Item__Name}>{el.name}</div>
                        <div>數量: {el.number}</div>
                        <div>總額: {el.total}</div>
                    </div>
                )
            });

            form = (
                <div className={classes.Checkout}>
                    <div className={classes.Checkout__ItemList}>
                        <h3>請確認您的餐點</h3>
                        <div className={classes.Checkout__Items}>
                            {list}
                        </div>
                        <div className={classes.Checkout__TotalPrice}>全部餐點的總金額為:{this.props.order.total}</div>
                    </div>
                    <ContactData />
                </div>
            )
        }
        return (
            <div className={classes.Container}>
                {this.props.auth.token ? null : <Redirect to="/" />}
                <Modal show={!this.props.order.cartList.length || this.props.purchase} modalClosed={this.redirect}>
                    {this.props.purchase ? '下單成功，前往訂單' : '購物車為空，返回主頁'}
                </Modal>
                {form}
            </div>
        )
    }
}


// export default Checkout
const mapStateToProps = (state) => {
    return {
        order: state.order,
        auth: state.auth,
        showNavbar: state.fetch.showNavbar,
        purchase: state.fetch.purchase
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navToggler: () => dispatch(navToggler()),
        initSpinner: () => dispatch(initSpinner())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)