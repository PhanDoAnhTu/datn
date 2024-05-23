import rootReducer from './reducers/root-reducer';
import { thunk } from 'redux-thunk';
// import { logger } from 'redux-logger';
import { legacy_createStore as createStore } from 'redux'
import { applyMiddleware } from 'redux';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export { store }

