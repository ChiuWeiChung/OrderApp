import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders, navToggler,initSpinner } from '../../store/actions/index';
import classes from './SummaryPage.module.css';
import Loader from '../../components/Loader/Loader';
class SummaryPage extends React.Component {

    state = {
        showDetail: false
    }

    componentDidMount() {
        // if (this.props.fetch.showNavbar) this.props.navToggler();
        this.props.initSpinner();
        this.props.fetchOrders(this.props.auth.token, this.props.auth.userId);
    }

    detailToggler = (e) => {
        this.setState((prevState) => {
            return { showDetail: !prevState.showDetail }
        })
        if (e.target.classList.contains(classes.Contact__Header)) {
            e.target.parentElement.children[1].classList.toggle(classes.ShowDetail)
        } else {
            e.target.parentElement.parentElement.children[1].classList.toggle(classes.ShowDetail);
        }
    }


    render() {
        let orderDetail = <Loader />
        if (!this.props.fetch.showSpinner && !this.props.fetch.error) {
            const orderedList = [...this.props.fetch.order];
            orderedList.sort((a, b) => {
                return (b.data.date - a.data.date);
            })
            orderDetail = orderedList.map(el => {
                let date = new Date(el.data.date);
                return (
                    <div key={el.id} className={classes.Order}>
                        <div className={classes.Items}>
                            <h3>餐點明細</h3>
                            <div className={classes.OrderDate}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</div>
                            <div className={classes.Item} >
                                <div>品名</div>
                                <div>數量</div>
                                <div>單價</div>
                            </div>
                            {el.data.orders.map(item => {
                                return (
                                    <div className={classes.Item} key={item.id}>
                                        <div>{item.name}</div>
                                        <div>{item.number}</div>
                                        <div>{item.price}</div>
                                    </div>
                                )
                            })}
                            <div className={classes.Order_TotalPrice}>總金額: {el.data.price} NTD</div>
                        </div>
                        <div className={classes.Contact}>
                            <div className={classes.Contact__Header} onClick={(e) => this.detailToggler(e)}>
                                <h2 style={{ display: 'inline-block' }}>聯絡資訊</h2>
                                <i className={`fas fa-caret-${this.state.showDetail ? 'up' : 'down'} ${classes.IconShow}`} ></i>
                            </div>
                            <div className={classes.Detail}>
                                <div>聯絡人: {el.data.contactData.name} </div>
                                <div>連絡電話: {el.data.contactData.phone}</div>
                                <div>email: {el.data.contactData.email}</div>
                                <div>外送地址: {el.data.contactData.address}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        if (!this.props.showDetail && this.props.fetch.error) orderDetail = <h2>{this.props.fetch.error}</h2>
        return (
            <div className={classes.Summary}>
                <h1>訂單紀錄</h1>
                {orderDetail}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // showSpinner: state.fetch.showSpinner,
        // order: state.fetch.order,
        // err: state.fetch.error,
        fetch:state.fetch,
        // showNavbar: state.nav.fetch.showNavbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
        navToggler: () => dispatch(navToggler()),
        initSpinner:()=>dispatch(initSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)