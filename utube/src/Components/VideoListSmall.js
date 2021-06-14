import { useContext } from 'react';
import UserContext from '../FormContext';
import VideoCardSmall from './VideoCardSmall';
import './VideoListSmall.css';


const VideoListSmall = () => {
  const { allVideoList } = useContext(UserContext);

  return (
    <div className='video-list-small-div'>
      { allVideoList.map( video => (
        <VideoCardSmall 
          key={video.id}
          id={video.id}
          createdAt={video.createdAt}
          title={video.title}
          username={video.username}
          url={video.url}
          description={video.description}
          thumbnail={video.thumbnailImage}
        />
      ))}  
    </div>  
  );  
}

export default VideoListSmall;