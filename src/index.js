import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import './index.css';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
import fetchReducer from './store/reducers/fetchReducer';


const rootReducer = combineReducers({
    order:orderReducer,
    auth:authReducer,
    fetch:fetchReducer
})
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <HashRouter  >
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)