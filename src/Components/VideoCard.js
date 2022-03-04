import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';


const VideoCard = ({ id, createdAt, title, username, description, thumbnail }) => {
  return (
    <Link to={`/watch/${id}`}>
      <div className='video-card-wide-div'>
        <div className='video-card-wide-image-div'>
          <img className='video-card-wide-image' src={thumbnail} alt=''/>
        </div>
        <div className='video-card-wide-body'>
          <h5 className='video-card-wide-title'>{title}</h5>
          <small className='video-card-wide-created-at'>{createdAt}</small>
          <p className='video-card-wide-username'>{username}</p>
          <p className='video-card-wide-description'>{description}</p>  
        </div>
      </div>  
    </Link>
  );  
}

export default VideoCard;
