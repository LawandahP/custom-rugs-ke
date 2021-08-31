import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux' //import redux to make it global
import store from './store'  //import store

import './index.css';

import './bootstrap.min.css';
// import './glassified.min.css';
//import './orange.min.css';
//import './zephyr.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
