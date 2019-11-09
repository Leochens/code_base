import React from 'react';
import { Route } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import App from './App';
import Main from './containers/Main/Main';
import Test from './containers/Test/Test';
import NewCode from './containers/NewCode/NewCode';
import SideBar from './components/SideBar/SideBar';
const AppRoutes = () => (
  <div>

    <Route path="/" component={Main}></Route>
    <Route path="/test" component={Test}></Route>
    <Route path="/newcode" component={NewCode}></Route>

  </div>
);
const example = (
  <Route>
    <SideBar />
    <Switch>
      <Route exact path="/index" component={Main}></Route>
      <Route exact path="/test" component={Test}></Route>
      <Route exact path="/newcode" component={NewCode}></Route>
    </Switch>
  </Route>
)
export default AppRoutes;




