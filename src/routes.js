import React from 'react';
import { Route } from 'react-router';

import App from './App';
import Main from './containers/Main/Main';
const AppRoutes = () => (
  <Route path="/" component={App}>
    <Route path="/" component={Main}>
      
    </Route>
  </Route>
);

export default AppRoutes;
