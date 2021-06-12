import { useContext } from 'react';
import UserContext from '../FormContext';
import './WatchVideo.css';

const WatchVideo = () => {
  const { currentVideo } = useContext(UserContext);

  return (
    <div className='video-watch-main-div'>
      <div className='video-watch-left-div-container'>
        <div className='video-player-div'>
          {/* <p>{currentVideo.id}</p> */}
          {/* <p className='video-player-description'>{currentVideo.description}</p> */}
          {/* <p className='video-player-video-url'>{currentVideo.url}</p> */}
          {/* <p className='video-player-username'>{currentVideo.username}</p> */}
          {/* <p>{currentVideo.thumbnailImage}</p> */}
          {/* <p>{currentVideo.likes.length}</p>
          <p>{currentVideo.comments.length}</p> */}
        </div>
        <div className='video-player-video-details'>
          <p className='video-player-title'>{currentVideo.title}</p>
          <p className='video-player-views'>{currentVideo.views.length} views .{currentVideo.createdAt}</p>
        </div>
        <hr className='video-watch-bottom-hr'/>
      </div>
      
      <div className='video-watch-suggested-videos-div'>

      </div>
    </div>
  );  
}

export default WatchVideo;