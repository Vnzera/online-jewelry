import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';
import About from './components/layout/About';
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
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Main} />
      </Fragment>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </section>
    </Router>
  </Provider>
)

export default App;
