import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
// import navReducer from './store/reducers/navReducer';
import fetchReducer from './store/reducers/fetchReducer';


const rootReducer = combineReducers({
    order:orderReducer,
    auth:authReducer,
    // nav:navReducer,
    fetch:fetchReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)