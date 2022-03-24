/* tslint:disable */
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './components/Head';
import PrivateRoute from './utils/PrivateRoute';

const LoadableHomePage = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './pages/Homepage'),
  loading: () => <div>Loading...</div>
});

const LoadableAddQuestionPage = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './pages/AddQuestion'),
  loading: () => <div>Loading...</div>
});

const LoadableOldHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './pages/Home'),
  loading: () => <div>Loading...</div>
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './pages/about/About'),
  loading: () => <div>Loading...</div>
});

const App = props => (
  <div className="app">
    <Head />
    {/* <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
    </nav> */}

    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHomePage} />
        <PrivateRoute exact path="/add" component={LoadableAddQuestionPage} />
        <Route exact path="/old-home" component={LoadableOldHome} />
        <Route path="/about" component={LoadableAbout} />
      </Switch>
    </main>

    <footer />
  </div>
);

export default App;
