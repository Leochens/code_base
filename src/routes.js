import React from 'react';
import { Route } from 'react-router';

import App from './App';
import Main from './containers/Main/Main';
import Test from './containers/Test/Test';
const AppRoutes = () => (
  <Route path="/" component={App}>
    <Route path="/index" component={Main}></Route>
    <Route path="/test" component={Test}></Route>
  </Route>
);

export default AppRoutes;
