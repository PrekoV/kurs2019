import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { store } from './store'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { history } from "./store";

ReactDOM.render(
    <Provider store={store}><App />
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App}></Route>
            </Switch>
        </Router>
    </Provider>
    // 
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
