import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCardSmall.css';


const VideoCardSmall = ({ id, createdAt, title, username, thumbnail }) => {
  return (
    <Link to={`/watch/${id}`}>
      <div className='video-card-small-div'>   
        <div className='video-card-small-image-div'>
          <img className='video-card-small-image' src={thumbnail} alt=''/>
        </div>
        <div className='video-card-small-body'>
          <h5 className='video-card-small-title'>{title}</h5>
            <p className='video-card-small-username'>{username}</p>
            <small className='video-card-small-created-at'>{createdAt}</small>
        </div>
      </div> 
    </Link>
  );
}

export default VideoCardSmall;