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
    
  const [ width, setWidth ] = useState(window.innerWidth);
  const breakPoint = 1000;  
  const [ subscribeButtonMessage, setSubscribeButtonMessage ] = useState('SUBSCRIBE');
  const [ likeButtonColor, setLikeButtonColor ] = useState('gray');
  const [ likeButtonFunction, setLikeButtonFunction ] = useState(null);
  const [ subscribeButtonFunction, setSubscribeButtonFunction ] = useState(null);
  const [ readyToRender, setReadyToRender ] = useState(false);


  const videoCreatorAvatar = currentVideo.userAvatar 
    ? currentVideo.userAvatar 
    : defaultAvatarImage;

  const getUser = useCallback(async () => {
    if(userTokenAndUsername.token){
      await UTubeApi.setToken(userTokenAndUsername.token);
      const user_ = await UTubeApi.getUser(userTokenAndUsername.username);
      user_.token = userTokenAndUsername.token;
  
      setUser( user_ );
    }

  }, [userTokenAndUsername, setUser]);  


  const setVideo = useCallback( async () => {
    setCurrentVideo( await UTubeApi.getVideo(id));
    getUser();

  }, [setCurrentVideo, id, getUser]);

  
  const checkSubscriptionsAndLikes = useCallback( async () => {
    const subscribeClick = async () => {
      await UTubeApi.setSubscription( {
        subscriberUsername: user.username, 
        subscribedToUsername: currentVideo.username 
      });

      setVideo();
    };

    const unsubscribeClick = async () => {
      await UTubeApi.unsubscribe( {
        subscriberUsername: user.username, 
        subscribedToUsername: currentVideo.username 
      });

      setVideo();
    };

   const likeClick = async () => {
     await UTubeApi.setVideoLike( {
        videoId: currentVideo.id, 
        username: user.username 
      });

      setVideo();
    };

    const unlikeClick = async () => {
      await UTubeApi.unlike( {
        videoId: currentVideo.id, 
        username: user.username 
      });

      setVideo();
    };

    
    if( user.token && currentVideo.id) {

      if (user.likes.includes(currentVideo.id)) {
        console.log('i like this video!');
        setLikeButtonFunction( () => unlikeClick);
        setLikeButtonColor('white');
      }else {
        console.log('i do not like this video!');
        setLikeButtonColor('gray');
        setLikeButtonFunction( () => likeClick);
      }

      if (user.subscriptions.includes(currentVideo.username)) {
        console.log('Subscribed!');
        setSubscribeButtonMessage('UNSUBSCRIBE');
        setSubscribeButtonFunction( () => unsubscribeClick);
      } else {
        console.log('Not subscribed!');
        setSubscribeButtonMessage('SUBSCRIBE');
        setSubscribeButtonFunction( () => subscribeClick);
      }

    }

  }, [user, currentVideo, setVideo]);
  

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
    checkSubscriptionsAndLikes();
    setReadyToRender(true);

    },[ checkSubscriptionsAndLikes]
  );

  // useEffect( () => {
  //   const subscribeClick = async () => {
  //     await UTubeApi.setSubscription( {
  //       subscriberUsername: user.username, 
  //       subscribedToUsername: currentVideo.username 
  //     });

  //     setVideo();
  //   };

  //   const unsubscribeClick = async () => {
  //     await UTubeApi.unsubscribe( {
  //       subscriberUsername: user.username, 
  //       subscribedToUsername: currentVideo.username 
  //     });

  //     setVideo();
  //   };

  //   const likeClick = async () => {
  //     await UTubeApi.setVideoLike( {
  //       videoId: currentVideo.id, 
  //       username: user.username 
  //     });

  //     setVideo();
  //   };

  //   const unlikeClick = async () => {
  //     await UTubeApi.unlike( {
  //       videoId: currentVideo.id, 
  //       username: user.username 
  //     });

  //     setVideo();
  //   };

    
  //   if( user.token && currentVideo.id) {

  //     if (user.likes.includes(currentVideo.id)) {
  //       console.log('i like this video!');
  //       setLikeButtonFunction( () => unlikeClick);
  //       setLikeButtonColor('white');
  //     }else {
  //       console.log('i do not like this video!');
  //       setLikeButtonColor('gray');
  //       setLikeButtonFunction( () => likeClick);
  //     }

  //     if (user.subscriptions.includes(currentVideo.username)) {
  //       console.log('Subscribed!');
  //       setSubscribeButtonMessage('UNSUBSCRIBE');
  //       setSubscribeButtonFunction( () => unsubscribeClick);
  //     } else {
  //       console.log('Not subscribed!');
  //       setSubscribeButtonMessage('SUBSCRIBE');
  //       setSubscribeButtonFunction( () => subscribeClick);
  //     }

  //   }
  //   setReadyToRender(true);
  // }, [user, currentVideo, setVideo]);


  useEffect( () => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
   });


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
                    await likeButtonFunction();
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
                    <img className='video-watch-video-creator-avatar' src={videoCreatorAvatar} alt='' />
                  </Link>
                  <p className='video-watch-video-creator-username'>{currentVideo.username}</p>
                </div>
              </div>
              { user.token &&
              <div className='video-watch-video-description-col2-div'>
                <Button 
                  color='danger' 
                  className='video-watch-subscribe-button'
                  onClick={ async () => await subscribeButtonFunction() }  
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
        {/* <VideoListSmall /> */}
      </div>
      }

    </>
  );  
}

export default WatchVideo;