import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import registerServiceWorker from './registerServiceWorker';
import { AUTH_USER } from './actions/Types';
import reducers from './reducers';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Notfound from './components/Notfound';
import requireAuth from './components/auth/requireAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(
  createStore
);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/feature" component={requireAuth(Feature)} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
