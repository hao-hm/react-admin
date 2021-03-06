import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory, hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import routes from './routes';
import reducers from './reducers';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
const loger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(thunk, loger)
);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);