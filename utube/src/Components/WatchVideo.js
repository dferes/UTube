import { useContext } from 'react';
import UserContext from '../FormContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';
import CommentList from './CommentList';
import VideoListSmall from './VideoListSmall';
import './WatchVideo.css';

const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';
const defaultVideoThumbnail = process.env.PUBLIC_URL + 'images/default_video_thumbnail2.jpg';


const WatchVideo = () => {
  const { currentVideo, user, setNewVideoLike, setNewSubscription, setUnsubscribe } = useContext(UserContext);
  const thumbnailImage = currentVideo.thumbnailImage 
    ? currentVideo.thumbnailImage
    : defaultVideoThumbnail; 

  const videoCreatorAvatar = currentVideo.userAvatar ? currentVideo.userAvatar : defaultAvatarImage;  

  const subscribeClick = async () => {
    console.log('in subscribeClick');
    await setNewSubscription( {
      subscriberUsername: user.username, 
      subscribedToUsername: currentVideo.username 
    });
  };

  const unsubscribeClick = async () => {
    await setUnsubscribe( {
      subscriberUsername: user.username, 
      subscribedToUsername: currentVideo.username 
    });
  };

  const likeClick = async () => {
    console.log('in likeClick');
    await setNewVideoLike( {
      videoId: currentVideo.id, 
      username: user.username 
    });
  };

  // const unLikeClick = async () => {
  //   console.log('in unLikeClick');
  //   await unlikeVideo( {
  //     videoId: currentVideo.id, 
  //     username: user.username
  //   });
  // };

  let subscribeButtonMessage = 'SUBSCRIBE';
  let subscribeButtonFunction = subscribeClick;
  // let likeButtonFunction = likeClick;

  if (user.subscriptions.includes(currentVideo.username)) {
    subscribeButtonMessage = 'UNSUBSCRIBE';
    subscribeButtonFunction = unsubscribeClick;
  }


  return (
    <div className='video-watch-main-div'>
      <div className='video-watch-left-div-container'>
        <div className='video-player-div'>
          <img className='video-player-thumbnail' src={thumbnailImage} alt='' />
          {/* <p className='video-player-video-url'>{currentVideo.url}</p> */}
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
                onClick={ async () => {
                  await setNewVideoLike( {
                    username: user.username, 
                    videoId: currentVideo.id
                  });
                  console.log('meh clicked');
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
                <img className='video-watch-video-creator-avatar' src={videoCreatorAvatar} alt='' />
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