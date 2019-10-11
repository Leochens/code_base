import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppRoutes from './routes.js'
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/configStore';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            {AppRoutes()}
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
