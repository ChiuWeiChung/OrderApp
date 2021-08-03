import React from 'react';
import Navbar from './components/Navbar/Navbar';
import OrderPage from './containers/OrderPage/OrderPage';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
import AuthPage from './containers/AuthPage/AuthPage';
import SummaryPage from './containers/SummaryPage/SummaryPage';
import Footer from './components/Footer/Footer';
import { clientId } from './hoc/clientId';
import { connect } from 'react-redux';
import { navToggler, setAuthRedirect, logout, authCheckState } from './store/actions/index'


import { Switch, Route, Redirect } from 'react-router-dom';
class App extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: "email"
            }).then(() => {
                this.props.authCheckState();
            })
        })
    }

    render() {

        let route = (
            <Switch>
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/summary" component={SummaryPage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/" component={OrderPage} />
                <Redirect to="/" />
            </Switch>
        )

        // if (this.props.auth.token) {
        //     route = (
        //         <Switch>
        //             <Route path="/checkout" component={CheckoutPage} />
        //             <Route path="/summary" component={SummaryPage} />
        //             <Route path="/" component={OrderPage} />
        //             <Redirect to="/" />
        //         </Switch>
        //     )
        // }

        return (
            <div>
                <Navbar setAuthRedirect={this.props.setAuthRedirect} auth={this.props.auth} logout={this.props.logout} toggler={this.props.navToggler} showNavbar={this.props.showNavbar} cart={this.props.cart} />
                {route}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        showNavbar: state.fetch.showNavbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navToggler: () => dispatch(navToggler()),
        setAuthRedirect: () => dispatch(setAuthRedirect('/')),
        logout: () => dispatch(logout()),
        authCheckState: () => dispatch(authCheckState())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)