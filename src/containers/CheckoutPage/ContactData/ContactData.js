import React from 'react';
import classes from './ContactData.module.css';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import validator from 'validator';
// import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { purchaseOrders } from '../../../store/actions/index';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '聯絡人'
                },
                value: '',
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '住址'
                },
                value: '',
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '電話'
                },
                value: '',
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-MAIL'
                },
                value: '',
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
    }

    inputChangedHandler = (event, id) => {
        let isValid = false;
        let validArr = [];
        switch (id) {
            case ('phone'):
                isValid = validator.isMobilePhone(event.target.value);
                break;
            case ('email'):
                isValid = validator.isEmail(event.target.value);
                break;
            default:
                isValid = !validator.isEmpty(event.target.value);
        }
        const updatedFormElement = {
            ...this.state.orderForm[id],
            ...{
                value: event.target.value,
                valid: isValid,
                touched: true
            }
        }
        const updatedOrderForm = {
            ...this.state.orderForm,
            ...{ [id]: updatedFormElement }
        }
        for (let key in updatedOrderForm) {
            validArr.push(updatedOrderForm[key].valid);
        }
        const validState = validArr.includes(false);
        this.setState({ orderForm: updatedOrderForm, formIsValid: !validState });
    }

    submitForm = (e) => {
        e.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        };
        const orderDate = new Date().getTime();
        const purchaseData = {
            orders: this.props.order.cartList,
            price: this.props.order.total,
            userId: this.props.auth.userId,
            contactData: formData,
            date: orderDate
        };
        this.props.onPurchase(this.props.auth.token, this.props.auth.userId, purchaseData);
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={(e) => this.submitForm(e)} >
                {formElementArray.map(el => {
                    return (
                        <Input
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            valid={el.config.valid}
                            touched={el.config.touched}
                            changed={(e) => this.inputChangedHandler(e, el.id)}
                        />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid} >Order</Button>
            </form>
        );

        if (this.props.showSpinner) form = <Loader />

        return (
            <div className={classes.ContactData} >
                <h3>請輸入您的外送資訊</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        auth: state.auth,
        showSpinner: state.fetch.showSpinner
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchase: (token, userId, purchaseData) => dispatch(purchaseOrders(token, userId, purchaseData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);