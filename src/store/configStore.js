import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;


