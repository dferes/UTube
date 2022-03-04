import { useContext, useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../FormContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';
import CommentList from './CommentList';
import VideoListSmall from './VideoListSmall';
import { likeClick, unlikeClick} from '../apiUtility/likes';
import { subscribeClick, unsubscribeClick} from '../apiUtility/subscriptions';
import { setVideoView, getVideo } from '../apiUtility/videos';
import { setToken, getUser_ } from '../apiUtility/users';
import VideoPlayer from './VideoPlayer';
import './WatchVideo.css';


const WatchVideo = () => {
  let { id } = useParams();
  id = Number(id);
  const { currentVideo, setCurrentVideo, user, userTokenAndUsername, setUser } = useContext(UserContext);
    
  const [ width, setWidth ] = useState(window.innerWidth);
  const breakPoint = 1000;  

  const [ subscribeButtonMessage, setSubscribeButtonMessage ] = useState('SUBSCRIBE');
  const [ likeButtonColor, setLikeButtonColor ] = useState('gray');
  const [ likeButtonFunction, setLikeButtonFunction ] = useState(null);
  const [ subscribeButtonFunction, setSubscribeButtonFunction ] = useState(null);
  const [ readyToRender, setReadyToRender ] = useState(false);

  useEffect( () => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
   });


  const getUser = useCallback(async () => {
    if(userTokenAndUsername.token){
      await setToken(userTokenAndUsername.token);
      const user_ = await getUser_(userTokenAndUsername.username);
      user_.token = userTokenAndUsername.token;
  
      setUser( user_ );
    }

  }, [userTokenAndUsername, setUser]);  


  const setVideo = useCallback( async () => {
    setCurrentVideo( await getVideo(id));
    getUser();

  }, [setCurrentVideo, id, getUser]);

  
  useEffect( () => {    
    setVideo(); 
    setVideoView( { 
      username: userTokenAndUsername.username,
      videoId: id
    });

  }, [id, userTokenAndUsername, setVideo]);

  useEffect( () => {
    if(currentVideo.id) setReadyToRender(true);
  }, [currentVideo, readyToRender]);


  useEffect( () => {
    if (user.username && currentVideo.id) {
      let subscribed_ = user.subscriptions.includes(currentVideo.username);
      let likesVideo_ = user.likes.includes(currentVideo.id);

      setLikeButtonColor(likesVideo_ ? 'white': 'gray');
      setLikeButtonFunction( () => likesVideo_ ? unlikeClick: likeClick);
      setSubscribeButtonMessage(subscribed_ ? 'UNSUBSCRIBE': 'SUBSCRIBE');
      setSubscribeButtonFunction( () => subscribed_ ? unsubscribeClick: subscribeClick);
    } 
  },[
      setLikeButtonColor, 
      setLikeButtonFunction, 
      setSubscribeButtonMessage, 
      setSubscribeButtonFunction,
      user, 
      currentVideo
    ]);


  return (
    <>
      { readyToRender &&
      <div className='video-watch-main-div'>
        <div className='video-watch-left-div-container'>
          <div className='video-player-div'>
            <VideoPlayer video={currentVideo} />
          </div>
          <div className='video-player-video-details'>
            <p className='video-player-title'>{currentVideo.title}</p>
            <div className='video-player-video-details-col-div'>
              <div 
                className='video-player-video-details-col1-div'
                style={{
                  width: width<breakPoint ? '87.5vw': '60vw',
                  maxWidth: width<breakPoint ? '68em': '60em',
                  minWidth: width<breakPoint ? '45em': '50em'
                }}  
              >
                <p className='video-player-views-and-date'>
                  {currentVideo.views.length} views . {currentVideo.createdAt}
                </p>
              </div>
              { user.token &&
              <div className='video-player-video-details-col2-div'>
                <FontAwesomeIcon 
                  icon={faThumbsUp} 
                  className="font-awesome-thumbs-up-icon"
                  style={{color: likeButtonColor}}
                  onClick={ async () => {
                    await likeButtonFunction(user, currentVideo); 
                    await setVideo();
                  }}  
                />
                <p className='video-player-video-likes'>{currentVideo.likes.length}</p>
              </div>
              }
            </div>
          </div>
          <hr className='video-watch-bottom-hr'/>

          <div className='video-watch-description-div'>
            <div className='video-watch-description-col-div'>
              <div className='video-watch-video-description-col1-div'>
                <div className='video-watch-video-creator-card'>
                  <Link to={`/profile/${currentVideo.username}`}>
                    <img className='video-watch-video-creator-avatar' src={currentVideo.userAvatar} alt='' />
                  </Link>
                  <p className='video-watch-video-creator-username'>{currentVideo.username}</p>
                </div>
              </div>
              { user.token &&
              <div className='video-watch-video-description-col2-div'>
                <Button 
                  color='danger' 
                  className='video-watch-subscribe-button'
                  onClick={ async () => {
                    await subscribeButtonFunction(user, currentVideo);
                    await setVideo();
                  }}  
                  >{ subscribeButtonMessage }</Button>
              </div>
              }
            </div>
            <div className='video-watch-description-text-div'>
              <p className='video-watch-description'>{currentVideo.description}</p> 
            </div>
          </div>
          <hr className='video-watch-bottom-hr'/>
          <CommentList comments={currentVideo.comments}/>
        </div>
        { width >= breakPoint &&
          <VideoListSmall  />
        }
      </div>
      }
    </>
  );  
}

export default WatchVideo;