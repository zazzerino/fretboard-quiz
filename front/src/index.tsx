import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { loadScoresAsync } from './actions';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                      || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

/* const store = createStore(
 *   rootReducer,
 *   applyMiddleware(thunkMiddleware)
 * ); */

// @ts-ignore
store.dispatch(loadScoresAsync());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/fretboard-quiz">
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
