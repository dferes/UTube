import { useContext } from 'react';
import UserContext from '../FormContext';

const WatchVideo = () => {
  const { currentVideo } = useContext(UserContext);

  return (
    <div>
      <h1>Meh: {Object.keys(currentVideo).length}</h1>
      <p>{currentVideo.id}</p>
      <p>{currentVideo.createdAt}</p>
      <p>{currentVideo.title}</p>
      <p>{currentVideo.description}</p>
      <p>{currentVideo.url}</p>
      <p>{currentVideo.username}</p>
      <p>{currentVideo.thumbnailImage}</p>
      <p>{currentVideo.views.length}</p>
      <p>{currentVideo.likes.length}</p>
      <p>{currentVideo.comments.length}</p>
    </div>  
  );  
}

export default WatchVideo;