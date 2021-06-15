import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import WatchVideo from './WatchVideo';
import VideoList from './VideoList';
import SubscriptionList from './SubscriptionList.js';
import LibraryList from './LibraryList';
import HistoryList from './HistoryList';


const Routes = ( props ) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/profile/:username'>
        <Profile />
      </Route>
      <Route exact path='/search'>
        <VideoList />
      </Route>
      <Route exact path='/watch'>
        <WatchVideo />
      </Route>
      <Route exact path='/subscriptions'>
        <SubscriptionList />
      </Route>
      <Route exact path='/library'>
        <LibraryList />
      </Route>
      <Route exact path='/history'>
        <HistoryList />
      </Route>
      <Route exact path='/signup'>
        {/* <Signup errorMessage={errorMessage} /> */}
        <Signup />
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