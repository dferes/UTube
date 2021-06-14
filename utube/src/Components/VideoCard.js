import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import './VideoCard.css';

const defaultVideoThumbnail = process.env.PUBLIC_URL + 'images/default_video_thumbnail2.jpg';


const VideoCard = ({ id, createdAt, title, username, url, description, thumbnail }) => {
  const { setVideoCardClicked } = useContext(UserContext);
  const history = useHistory();

  return (
    <div 
      className='video-card-wide-div'
      onClick={ async () => {
        await setVideoCardClicked(id);
        history.push(`/watch`);
      }}
    >
      <div className='video-card-wide-image-div'>
        <img className='video-card-wide-image' src={thumbnail? thumbnail: defaultVideoThumbnail} alt=''/>
      </div>
      <div className='video-card-wide-body'>
        <h5 className='video-card-wide-title'>{title}</h5>
        <small className='video-card-wide-created-at'>{createdAt}</small>
        <p className='video-card-wide-username'>{username}</p>
        <p className='video-card-wide-description'>{description}</p>  
      </div>
    </div>  
  );  
}

export default VideoCard;
