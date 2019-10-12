import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';
import About from './components/layout/About';
import Account from './components/layout/Account';
import Cart from './components/layout/Cart';
import Contact from './components/layout/Contact';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

// the Alert component will only display when alerts have been set
import Alert from './components/layout/Alert';

import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path="/about" component={About} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </>
    </Router>
  </Provider>
)

export default App;
