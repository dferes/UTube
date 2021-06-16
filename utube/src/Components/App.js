// import React, { useState, useEffect } from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';
import FormContext from '../FormContext';
import useLocalStorage from '../hooks/useLocalStorage';
import './App.css';
import UTubeApi from '../api';


function App() {
  const [ videoCardClicked, setVideoCardClicked] = useState(null);
  const [ newVideoLike, setNewVideoLike ] = useState({});
  const [ newVideoUnlike, setNewVideoUnlike ] = useState({});
  const [ newSubscription, setNewSubscription ] = useState({});

  const [ userTokenAndUsername, setUserTokenAndUsername ] = 
    useLocalStorage('userTokenAndUsername', {});
  const [ user, setUser ] = useLocalStorage('user',  {} );

  const [ videoSearchList, setVideoSearchList ] = useLocalStorage('videoSearchList', []);
  const [ allVideoList, setAllVideoList ] = useLocalStorage('allVideoList', []);
  const [ currentVideo, setCurrentVideo ] = useLocalStorage('currentVideo', {});
  const [ comment, setComment ] = useState({});
  const [ unsubscribe, setUnsubscribe] = useState({});
  const [ unlike, setUnlike] = useState({});
  // const [ errorMessage, setErrorMessage ] = useState({});
  // const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  // const history = useHistory();

  useEffect( () => {
    const setHomePageVideos = async () => {
      setAllVideoList( await UTubeApi.videoSearch());
    }
    setHomePageVideos();
  }, [setAllVideoList]);


  useEffect( () => {
    const setCurrentVideoToWatch = async (videoCardClicked) => {
      setCurrentVideo( await UTubeApi.getVideo(videoCardClicked));
    }

    const setVideoView = async (view) => {
      await UTubeApi.setVideoView(view);
    }

    if(videoCardClicked ){
      setCurrentVideoToWatch( videoCardClicked );
      setVideoCardClicked(null);
      setVideoView( { 
        username: user.username,
        videoId: videoCardClicked
      });
    }else if (comment.content) { // if a new comment was added, must get list of new comments
      setCurrentVideoToWatch( currentVideo.id );  
      setComment({});
    } 
  }, [setCurrentVideo, currentVideo, videoCardClicked, setVideoCardClicked, user, comment, setComment]);


  useEffect( () => {
    const setNewLike = async (newVideoLike) => {
      UTubeApi.setToken(userTokenAndUsername.token);
      await UTubeApi.setVideoLike(newVideoLike)
    };

    if(newVideoLike.videoId){
      setNewLike(newVideoLike);
      setNewVideoLike({});
    }
  }, [setNewVideoLike, newVideoLike, userTokenAndUsername]);


  useEffect( () => {
    const unlikeVideo = async (unlike) => {
      UTubeApi.setToken(userTokenAndUsername.token);
      console.log(`videoUnlike: ${unlike}`);
      await UTubeApi.unlike(unlike);
    };

    if(unlike.videoId){
      unlikeVideo(unlike);
      setUnlike({});
    }
  }, [setUnlike, unlike, userTokenAndUsername]);


  useEffect( () => {
    const setNewUserSubscription = async () => {
      UTubeApi.setToken(userTokenAndUsername.token);
      await UTubeApi.setSubscription(newSubscription)
    };

    if(newSubscription.subscribedToUsername){
      setNewUserSubscription(newSubscription);
      setNewSubscription({});
    }
  }, [newSubscription, setNewSubscription, userTokenAndUsername]);


  // Logs the user in or out if userTokenAndUsername.token is set to '' */
  useEffect( () => {
    const logout = async () => {
      await setUser({});
    };
    
    const login = async (username) => {
      await UTubeApi.setToken(userTokenAndUsername.token);
      const user_ = await UTubeApi.getUser(username);
      user_.token = userTokenAndUsername.token;

      await setUser( user_ );
    }
  
    if (!(userTokenAndUsername.token && userTokenAndUsername.username) ) logout();
    else if (userTokenAndUsername.username){
      login(userTokenAndUsername.username);
    }
  }, [setUser, setUserTokenAndUsername, userTokenAndUsername]);


  useEffect( () => {
    const unsubscribeUser = async (unsubscribe) => {
      console.log('----------- in here:', unsubscribe);
      UTubeApi.setToken(userTokenAndUsername.token);
      await UTubeApi.unsubscribe(unsubscribe);
    } 
    if(unsubscribe.subscribedToUsername) {
      unsubscribeUser(unsubscribe);
      setUnsubscribe({});
    }
    else console.log('didnt catch it: ', unsubscribe);
  }, [unsubscribe, setUnsubscribe, userTokenAndUsername]);

  const formFunctions = {
    user: user,
    setUser: setUser,
    userTokenAndUsername: userTokenAndUsername,
    videoSearchList: videoSearchList,
    setVideoSearchList: setVideoSearchList,
    allVideoList: allVideoList,
    setAllVideoList: setAllVideoList,
    currentVideo: currentVideo,
    setVideoCardClicked: setVideoCardClicked,
    newVideoLike: newVideoLike, 
    setNewVideoLike: setNewVideoLike,
    newSubscription: newSubscription, 
    setNewSubscription: setNewSubscription,
    comment: comment,
    setComment: setComment,
    setUserTokenAndUsername: setUserTokenAndUsername,
    setUnsubscribe: setUnsubscribe,
    newVideoUnlike: newVideoUnlike,
    setNewVideoUnlike: setNewVideoUnlike
  };
  



  return (
    <div className="App">
      <FormContext.Provider value={formFunctions}>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes 
              // userToken={userToken}
              // errorMessage={errorMessage}
              // showSuccessMessage={showSuccessMessage}
              // setShowSuccessMessage={setShowSuccessMessage}
            />
          </main>
        </BrowserRouter>
      </FormContext.Provider>
    </div>
  );
}

export default App;
