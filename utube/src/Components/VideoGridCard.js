import { useContext } from 'react';
import UserContext from '../FormContext';
import { Link } from 'react-router-dom';
import './VideoGridCard.css';
// const defaultVideoThumbnail = process.env.PUBLIC_URL + 'images/default_video_thumbnail2.jpg';


const VideoGridCard = ({ id, createdAt, title, username, thumbnail }) => {  
  const { defaultVideoThumbnail } = useContext(UserContext);
  
  return (
    <Link to={`/watch/${id}`}>
      <div className='video-grid-card-div'>
        <div className='video-grid-card-image-div'>
          <img className='video-grid-card-image' src={thumbnail? thumbnail: defaultVideoThumbnail} alt=''/>
        </div>
        <div className='video-grid-card-body'>
          <h5 className='video-grid-card-title'>{title}</h5>
          <p className='video-grid-card-username'>{username}</p>
          <small className='video-grid-card-created-at'>{}{createdAt}</small>
        </div>
      </div>  
    </Link>
  );  
}

export default VideoGridCard;
