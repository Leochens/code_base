import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const logger = createLogger({ collapsed: true });
//非侵入式
let storeEnhancers = compose(
    applyMiddleware(thunk, logger),
    process.env.NODE_ENV === 'production' ? null : window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : null
)
let store = createStore(rootReducer, storeEnhancers);
// let store = process.env.NODE_ENV === 'production' ? (
//     createStore(rootReducer, applyMiddleware(thunk, logger))
// ) : (
//         window.__REDUX_DEVTOOLS_EXTENSION__ ? (
//             createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__())
//         ) : (
//                 createStore(rootReducer, applyMiddleware(thunk, logger))
//             )
//     )
export default store;


