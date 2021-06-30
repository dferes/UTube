import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';
import FormContext from '../FormContext';
import useLocalStorage from '../hooks/useLocalStorage';
import './App.css';
import UTubeApi from '../api';


function App() {
  const videoReel = process.env.PUBLIC_URL + '/images/video_reel2.png';

  const [ newVideoLike, setNewVideoLike ] = useState({});
  const [ newSubscription, setNewSubscription ] = useState({});
  const [ user, setUser ] = useLocalStorage('user',  {} );
  const [ userTokenAndUsername, setUserTokenAndUsername ] = useLocalStorage('userTokenAndUsername', {});

  const [ videoSearchList, setVideoSearchList ] = useLocalStorage('videoSearchList', []);
  const [ allVideoList, setAllVideoList ] = useLocalStorage('allVideoList', []);
  const [ currentVideo, setCurrentVideo ] = useLocalStorage('currentVideo', {});
  const [ comment, setComment ] = useState({});


  useEffect( () => {
    const setHomePageVideos = async () => {
      setAllVideoList( await UTubeApi.videoSearch());
    }
    setHomePageVideos();
  }, [setAllVideoList]);


  useEffect( () => {
    const setCurrentVideoToWatch = async (videoId) => {
      setCurrentVideo( await UTubeApi.getVideo(videoId));
    }

    if (comment.content) {
      setCurrentVideoToWatch( currentVideo.id );  
      setComment({});
    } 
  }, [comment, setComment, setCurrentVideo, currentVideo]);


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


  const formFunctions = {
    user: user,
    setUser: setUser,
    userTokenAndUsername: userTokenAndUsername,
    videoSearchList: videoSearchList,
    setVideoSearchList: setVideoSearchList,
    allVideoList: allVideoList,
    setAllVideoList: setAllVideoList,
    currentVideo: currentVideo,
    setCurrentVideo: setCurrentVideo,
    newVideoLike: newVideoLike, 
    setNewVideoLike: setNewVideoLike,
    newSubscription: newSubscription, 
    setNewSubscription: setNewSubscription,
    comment: comment,
    setComment: setComment,
    setUserTokenAndUsername: setUserTokenAndUsername,
    videoReel: videoReel
  };
  

  return (
    <div className="App">
      <FormContext.Provider value={formFunctions}>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes />
          </main>
        </BrowserRouter>
      </FormContext.Provider>
    </div>
  );
}

export default App;
