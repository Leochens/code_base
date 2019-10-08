import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const logger = createLogger({ collapsed: true });

// const store = createStore(rootReducer, applyMiddleware(logger));
// const store = createStore(rootReducer, composeWithDevTools());
//非侵入式
let store = process.env.NODE_ENV === 'production' ? (
    createStore(rootReducer, applyMiddleware(logger))
) : (
        window.__REDUX_DEVTOOLS_EXTENSION__ ? (
            createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__())
        ) : (
                createStore(rootReducer, applyMiddleware(logger))
            )
    )
export default store;


