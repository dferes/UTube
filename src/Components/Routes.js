import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import WatchVideo from './WatchVideo';
import VideoList from './VideoList';
import SubscriptionList from './SubscriptionList.js';
import LikeList from './LikeList';
import HistoryList from './HistoryList';
import EditProfile from './EditProfile';
import VideoUpload from './VideoUpload';
import ScrollToTop from './ScrollToTop';


const Routes = ( ) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/profile/:username/edit'>
        <EditProfile />
      </Route>
      <Route exact path='/profile/:username/upload'>
        <VideoUpload />
      </Route>
      <Route exact path='/profile/:username/about'>
        <Profile about={true} />
      </Route>
      <Route exact path='/profile/:username'>
        <Profile />
      </Route>
      <Route exact path='/search'>
        <VideoList />
      </Route>
      <Route exact path='/watch/:id'>
        <ScrollToTop />
        <WatchVideo />
      </Route>
      <Route exact path='/subscriptions'>
        <SubscriptionList />
      </Route>
      <Route exact path='/liked-videos'>
        <LikeList />
      </Route>
      <Route exact path='/history'>
        <HistoryList />
      </Route>
      <Route exact path='/signup'>
        <Signup />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;