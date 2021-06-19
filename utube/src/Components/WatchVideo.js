import { useContext, useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../FormContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';
import CommentList from './CommentList';
import VideoListSmall from './VideoListSmall';
import UTubeApi from '../api';
import VideoPlayer from './VideoPlayer';
import './WatchVideo.css';


const WatchVideo = () => {
  let { id } = useParams();
  id = Number(id);
  const { currentVideo, setCurrentVideo, user, defaultAvatarImage, 
    userTokenAndUsername, setUser } = useContext(UserContext);
    
  const [ subscribeButtonMessage, setSubscribeButtonMessage ] = useState('SUBSCRIBE');
  const [ likeButtonColor, setLikeButtonColor ] = useState('gray');
  const [ likeButtonFunction, setLikeButtonFunction ] = useState(null);
  const [ subscribeButtonFunction, setSubscribeButtonFunction ] = useState(null);

  // const thumbnailImage = currentVideo.thumbnailImage 
  //   ? currentVideo.thumbnailImage
  //   : defaultVideoThumbnail; 

  const videoCreatorAvatar = currentVideo.userAvatar 
    ? currentVideo.userAvatar 
    : defaultAvatarImage;

  const getUser = useCallback(async () => {
    if(userTokenAndUsername.token){
      // console.log('my info: ', user);
      await UTubeApi.setToken(userTokenAndUsername.token);
      const user_ = await UTubeApi.getUser(userTokenAndUsername.username);
      user_.token = userTokenAndUsername.token;
  
      setUser( user_ );
    }

  }, [userTokenAndUsername, setUser]);  

  const setVideo = useCallback( async () => {
    // console.log('in setCurrentVideoToWatch -- videoId: ', id)
    setCurrentVideo( await UTubeApi.getVideo(id));
    
    getUser();   
  }, [setCurrentVideo, id, getUser]);



  useEffect( () => {
    const setVideoView = async (view) => {
      await UTubeApi.setVideoView(view);
    }
      setVideo();
     
      setVideoView( { 
        username: userTokenAndUsername.username,
        videoId: id
      });

  }, [id, userTokenAndUsername, setVideo]);


  useEffect( () => {
    const subscribeClick = async () => {
      // console.log('in subscribeClick');
      await UTubeApi.setSubscription( {
        subscriberUsername: userTokenAndUsername.username, 
        subscribedToUsername: currentVideo.username 
      });
      // getUser();
      setVideo();
    };

    const unsubscribeClick = async () => {
      await UTubeApi.unsubscribe( {
        subscriberUsername: userTokenAndUsername.username, 
        subscribedToUsername: currentVideo.username 
      });
      // getUser();
      setVideo();
    };

    const likeClick = async () => {
      // console.log('in likeClick: currentVideo.id: ', currentVideo.id, 'username: ',userTokenAndUsername.username );
      await UTubeApi.setVideoLike( {
        videoId: currentVideo.id, 
        username: userTokenAndUsername.username 
      });
      // getUser();
      setVideo();
    };

    const unlikeClick = async () => {
      // console.log('in unlikeClick');
      await UTubeApi.unlike( {
        videoId: currentVideo.id, 
        username: userTokenAndUsername.username 
      });
      // getUser();
      setVideo();
    };

    
    if( userTokenAndUsername.token ) {
      // console.log('I HAVE A TOKEN!!');

      if (user.likes.includes(currentVideo.id)) {
        // console.log('I like the video');
        setLikeButtonFunction( () => unlikeClick);
        setLikeButtonColor('white');
      }else {
        setLikeButtonColor('gray');
        setLikeButtonFunction( () => likeClick);
      }

      if (user.subscriptions.includes(currentVideo.username)) {
        // console.log('I am subscribed to this user');
        setSubscribeButtonMessage('UNSUBSCRIBE');
        setSubscribeButtonFunction( () => unsubscribeClick);
      } else {
        setSubscribeButtonMessage('SUBSCRIBE');
        setSubscribeButtonFunction( () => subscribeClick);
      }
    }

    },[ user.likes, user.subscriptions, currentVideo, id, userTokenAndUsername, setVideo ]
  );

  // console.log('USER INFO: ', user);

  return (
    <div className='video-watch-main-div'>
      <div className='video-watch-left-div-container'>
        <div className='video-player-div'>
          {/* <img className='video-player-thumbnail' src={thumbnailImage} alt='' /> */}
          <VideoPlayer video={currentVideo} />
        </div>
        <div className='video-player-video-details'>
          <p className='video-player-title'>{currentVideo.title}</p>
          <div className='video-player-video-details-col-div'>
            <div className='video-player-video-details-col1-div'>
              <p className='video-player-views-and-date'>
                {currentVideo.views.length} views . {currentVideo.createdAt}
              </p>
            </div>
            <div className='video-player-video-details-col2-div'>
              <FontAwesomeIcon 
                icon={faThumbsUp} 
                className="font-awesome-thumbs-up-icon"
                style={{color: likeButtonColor}}
                onClick={ async () => {
                  await likeButtonFunction();
                }}   
              />
              <p className='video-player-video-likes'>{currentVideo.likes.length}</p>
            </div>
          </div>
        </div>
        <hr className='video-watch-bottom-hr'/>

        <div className='video-watch-description-div'>
          <div className='video-watch-description-col-div'>
            <div className='video-watch-video-description-col1-div'>
              <div className='video-watch-video-creator-card'>
                <Link to={`/profile/${currentVideo.username}`}>
                  <img className='video-watch-video-creator-avatar' src={videoCreatorAvatar} alt='' />
                </Link>
                <p className='video-watch-video-creator-username'>{currentVideo.username}</p>
              </div>
            </div>
            <div className='video-watch-video-description-col2-div'>
              <Button 
                color='danger' 
                className='video-watch-subscribe-button'
                onClick={ async () => await subscribeButtonFunction() }  
                >{ subscribeButtonMessage }</Button>
            </div>
          </div>
          <div className='video-watch-description-text-div'>
            <p className='video-watch-description'>{currentVideo.description}</p> 
          </div>
        </div>
        <hr className='video-watch-bottom-hr'/>
        <CommentList comments={currentVideo.comments}/>
      </div>      
      <VideoListSmall  />            
    </div>
  );  
}

export default WatchVideo;