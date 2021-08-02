import React from 'react';
import classes from './OrderPage.module.css';
import CostColumn from './CostColumn/CostColumn';
import Items from './Items/Items';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import Menu from '../../components/Menu/Menu';
import ViewCart from '../../components/ViewCart/ViewCart';
import Modal from '../../components/Modal/Modal';
import Aux from '../../hoc/auxiliary';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { choose, changeNumber, cancelButton, addItem, removeItem, navToggler, setAuthRedirect, fetchMenu, closeModal, initSpinner } from '../../store/actions/index';

class OrderPage extends React.Component {

    state = {
        showColumn: false,
        imgStatus: false,
    }

    componentDidMount() {
        // if (this.props.fetch.showNavbar) this.props.navToggler();
        this.props.initSpinner();
        if (!this.props.fetch.menuList.length) this.props.fetchMenu();
    }


    columnController = () => {
        this.setState((state) => {
            return { showColumn: !state.showColumn }
        })
    }
    exitDetail = () => {
        if (this.props.order.showDetail) {
            this.props.onCancel();
        }
    }

    replacePage = (item) => {
        this.props.history.replace(item)
    }

    handleImageLoaded = () => {
        this.setState({ imgStatus: true })
    }

    checkoutButton = () => {
        if (this.props.auth.token) {
            this.props.history.push('/checkout');
        } else {
            this.props.setAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    render() {
        let items = <Loader />;
        if (this.props.fetch.menuList.length || this.props.fetch.error) {
            items = (
                <Items
                    onChoose={this.props.onChoose}
                    exitDetail={this.exitDetail}
                    fetch={this.props.fetch}
                    imgStatus={this.state.imgStatus}
                    pathname={this.props.history.location.pathname}
                    handleImageLoaded={this.handleImageLoaded}
                />
            )
        }

        return (
            <Aux>
                <Modal show={this.props.fetch.showModal} modalClosed={this.props.closeModal}>
                    {this.props.fetch.error ? this.props.fetch.error: null}
                </Modal>

                <div className={classes.Container} >
                    <Menu replacePage={this.replacePage} />
                    <div className={classes.List}>
                        <ViewCart columnController={this.columnController} cartList={this.props.order.cartList} />
                        <CostColumn
                            order={this.props.order}
                            onChoose={this.props.onChoose}
                            onRemove={this.props.onRemove}
                            auth={this.props.auth}
                            checkoutButton={this.checkoutButton}
                            showColumn={this.state.showColumn}
                            columnController={this.columnController} />
                        {items}
                        <OrderDetail
                            order={this.props.order}
                            onChange={this.props.onChange}
                            cancelButton={this.props.onCancel}
                            onAdd={this.props.onAdd} />
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        auth: state.auth,
        // showNavbar: state.nav.showNavbar,
        fetch: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChoose: (name, price, e) => dispatch(choose(name, price, e)),
        onChange: (isAdd) => dispatch(changeNumber(isAdd)),
        onCancel: () => dispatch(cancelButton()),
        onAdd: (item) => dispatch(addItem(item)),
        onRemove: (name) => dispatch(removeItem(name)),
        navToggler: () => dispatch(navToggler()),
        setAuthRedirect: (path) => dispatch(setAuthRedirect(path)),
        fetchMenu: () => dispatch(fetchMenu()),
        closeModal: () => dispatch(closeModal()),
        initSpinner: () => dispatch(initSpinner()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)

