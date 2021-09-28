// redux.js.org/api-reference/store
// A store holds the whole state tree of your application.
// The only way to change the state inside it, is to dispatch an ACTION to it!

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js'

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;