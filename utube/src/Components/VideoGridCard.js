import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import './VideoGridCard.css';
// import { Link } from 'react-router-dom';
const defaultVideoThumbnail = process.env.PUBLIC_URL + 'images/default_video_thumbnail2.jpg';


const VideoGridCard = ({ id, createdAt, title, username, url, description, thumbnail }) => {  
  const { setVideoCardClicked } = useContext(UserContext);
  const history = useHistory();
    
  return (
    <div onClick={ async () => {
        await setVideoCardClicked(id);
        history.push(`/watch`);
      }}>
      {/* <Link to='/watch' > */}
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
    </div>  
  );  
}

export default VideoGridCard;
