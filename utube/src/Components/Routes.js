import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';


const Routes = ( props ) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/signup'>
        {/* <Signup errorMessage={errorMessage} /> */}
        <Signup  />
      </Route>
      <Route exact path='/login'>
        {/* <Login errorMessage={errorMessage} /> */}
        <Login />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;