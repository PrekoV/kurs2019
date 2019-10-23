// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';
// import { createStore, applyMiddleware } from 'redux';

// export const store = createStore(rootReducer, applyMiddleware(thunk));

import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = require("history").createBrowserHistory

//const middleware = [thunk, routerMiddleware(history)]

export const store = createStore(connectRouter(history)(rootReducer), composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))))
//export const store = createStore(connectRouter(rootReducer), applyMiddleware(thunk))