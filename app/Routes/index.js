// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from '@constants/routes.json';
import Home from './Home';

export default () => (
  <Switch>
    <Route path={routes.home} component={Home} />
  </Switch>
);
