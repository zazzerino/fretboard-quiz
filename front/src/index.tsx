import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import * as theory from './theory';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
console.log(store.getState());

/* for (let i = 0; i < 10; i++) {
 *   console.log(theory.randomNoteOnStrings({ strings: [5] }));
 * } */

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
