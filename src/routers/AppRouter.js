import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRouter path="/" component={LoginPage} exact={true} />
        <PrivateRouter path="/dashboard" component={DashboardPage} exact={true} />
        
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
