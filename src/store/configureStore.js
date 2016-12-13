import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../reducers';

const configureStore = () => {

    const initialState = {};
    const loggerMiddleware = createLogger()

    const isProduction = process.env.NODE_ENV === 'production';
    let enchancer = {};

    if (isProduction) {
        enchancer = compose(
            applyMiddleware(thunkMiddleware)
        );
    } else {
        enchancer = compose(
            applyMiddleware(thunkMiddleware, loggerMiddleware),
        );
    }

    const combinedReducer = combineReducers({
        ...reducers
    });

    return createStore(combinedReducer, initialState, enchancer)
};

export default configureStore;

