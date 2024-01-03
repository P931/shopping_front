import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware } from "redux";
// import { applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
// import CartAction from "./Reducer/Dispatch";
import ProductReducer from './Reducer/ProductCartReducer';

// const rootReducer = combineReducers({ CartAction })

// const GlobalStore = configureStore({ reducer: rootReducer }, applyMiddleware(thunk))

const rootReducer = combineReducers({ ProductReducer })

const GlobalStore = configureStore({ reducer: rootReducer }, applyMiddleware(thunk))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={GlobalStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
