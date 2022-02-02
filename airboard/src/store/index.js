import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { flightsReducer } from './flights';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  flights: flightsReducer,
});

export default createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));
