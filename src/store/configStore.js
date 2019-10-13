import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas/sagas';
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({ collapsed: true });
//非侵入式
let storeEnhancers = compose(
    applyMiddleware(sagaMiddleware, logger),
    // process.env.NODE_ENV === 'production' ? null : window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : null
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

let store = createStore(rootReducer, storeEnhancers);
sagaMiddleware.run(sagas);

export default store;


