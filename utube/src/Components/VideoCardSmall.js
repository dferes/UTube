import React from 'react';
// import { useHistory } from 'react-router-dom';
// import UserContext from '../FormContext';
import { Link } from 'react-router-dom';
import './VideoCardSmall.css';
const defaultVideoThumbnail = process.env.PUBLIC_URL + 'images/default_video_thumbnail2.jpg';


const VideoCardSmall = ({ id, createdAt, title, username, thumbnail }) => {
  // const { setVideoCardClicked } = useContext(UserContext);
  // const history = useHistory();

  return (
    <Link to={`/watch/${id}`}>
      <div 
       className='video-card-small-div'
      //  onClick={ async () => {
      //    await setVideoCardClicked(id);
      //    history.push(`/watch`);
      //  }}
      >   
      <div className='video-card-small-image-div'>
        <img className='video-card-small-image' src={thumbnail? thumbnail: defaultVideoThumbnail} alt=''/>
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