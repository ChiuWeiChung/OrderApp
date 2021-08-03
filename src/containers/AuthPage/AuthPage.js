import React from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import classes from './AuthPage.module.css';
import validator from 'validator';
import Loader from '../../components/Loader/Loader';
import Aux from '../../hoc/auxiliary';
import { connect } from 'react-redux';
import { navToggler, setAuthRedirect, sign, initSpinner } from '../../store/actions/index'
import { Redirect } from 'react-router-dom';


class AuthPage extends React.Component {

    componentDidMount() {
        this.props.initSpinner()
        if (this.props.cartList.length === 0 && this.props.auth.authRedirect !== '/') this.props.setAuthRedirect();
    }

    state = {
        orderForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        forSignIn: true,
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

    switch = () => {
        this.setState((prevState) => {
            return { forSignIn: !prevState.forSignIn }
        })
    }

    formOnSubmit = (event) => {
        event.preventDefault();
        this.props.sign('FIREBASE', this.state.orderForm.email.value, this.state.orderForm.password.value, this.state.forSignIn);
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
            <form className={classes.Form} onSubmit={this.formOnSubmit}>
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
                <Button btnType="Success" disabled={!this.state.formIsValid} >Submit</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {this.props.auth.token ? <Redirect to={this.props.auth.authRedirect} /> : null}
                {this.props.auth.loading ? <Loader /> :
                    <Aux>
                        <p className={classes.Hint}>Try Email: demo@demo.com and Password: demo123</p>
                        <h1>請輸入{this.state.forSignIn ? "登入" : "註冊"}資訊 </h1>
                        <div className={classes.AuthDetail}>Supported By Firebase Authentication</div>
                        {form}
                        {this.props.auth.error ? <p style={{ color: 'red', fontWeight: "bold" }}>{this.props.auth.error}</p> : null}
                        <div className={classes.Switch}>
                            <Button btnType="Black" clicked={this.switch}>我要{this.state.forSignIn ? "註冊" : "登入"}</Button>
                            <Button btnType="Black" clicked={() => this.props.sign('GOOGLE')} ><i className="fab fa-google"></i>Google登入</Button>
                        </div>
                    </Aux>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        fetch: state.fetch,
        cartList: state.order.cartList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navToggler: () => dispatch(navToggler()),
        setAuthRedirect: () => dispatch(setAuthRedirect('/')),
        sign: (type, email, pwd, forSignIn) => dispatch(sign(type, email, pwd, forSignIn)),
        initSpinner: () => dispatch(initSpinner())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)