import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import UTubeApi from '../api';
import UserContext from '../FormContext';
import VideoGridCard from './VideoGridCard';
import './Profile.css';

const Profile = ({ about = false }) => {
  let { username } = useParams();
  const [ otherUser, setOtherUser ] = useState({});
  const [ readyToRender, setReadyToRender ] = useState(false);
  const [ otherUserVideos, setOtherUserVideos] = useState({});
  
  const getOtherUser = useCallback( async () => {
    setOtherUser(await UTubeApi.getUser(username));
    
    setOtherUserVideos( 
      await UTubeApi.videoSearch({ username: username})
    );

    setReadyToRender(true);
    // console.log('in getOtherUser');
  }, [username, setReadyToRender, setOtherUser, setOtherUserVideos]);


  useEffect( () => {
    if(!readyToRender)
    getOtherUser();
  }, [getOtherUser, readyToRender, username]);

  const { user, defaultHeader, defaultAvatarImage } = useContext(UserContext);
  const header = otherUser.coverImage? otherUser.coverImage: defaultHeader;
  const otherUserAvatar = otherUser.avatarImage ? otherUser.avatarImage: defaultAvatarImage;

  return (
    <>
      { readyToRender &&
        <div className='user-profile-main-div>'>
          <div 
            className='user-profile-row1-header'
            style={{
              backgroundImage: `url(${header})`,
              textAlign: 'center'
              
            }}  
          >
          </div>
          <div className='user-profile-row2-top-bar'>
            <div className='user-profile-top-bar-row-div'>
              <div className='user-profile-user-card'>
                <img className='user-profile-user-avatar' src={otherUserAvatar} alt=''/>
                <div className='user-profile-user-card-info-div'>
                  <p className='user-profile-username'>{otherUser.username}</p>
                  <p className='user-profile-user-likes'>{otherUser.subscribers.length} subscribers</p>
                </div>
              </div>
            </div>

            <div className='user-profile-top-bar-nav'>
              <div className='user-profile-top-bar-nav-link-container'>    
                <div className={`user-profile-top-bar-nav-videos${about? '' : '-active'}`}>
                  <NavLink 
                    to={`/profile/${otherUser.username}`} 
                    style={{textDecoration: 'none'}}
                  >
                    <p className='user-profile-nav-text'>VIDEOS</p>
                  </NavLink>
                </div>             
                { user.username && user.username === otherUser.username &&
                  <>
                    <div className='user-profile-top-bar-nav-edit-profile'>
                      <NavLink 
                        to={`/profile/${otherUser.username}/edit`} 
                        style={{textDecoration: 'none'}}
                      >
                        <p className='user-profile-nav-text'>EDIT PROFILE</p>
                      </NavLink>
                    </div>
                    <div className='user-profile-top-bar-nav-upload-video'>
                      <NavLink 
                        to={`/profile/${otherUser.username}/upload`} 
                        style={{textDecoration: 'none'}}
                      >
                        <p className='user-profile-nav-text'>UPLOAD</p>
                      </NavLink>
                    </div>
                  </>
                }
                <div className={`user-profile-top-bar-nav-about${about? '-active' : ''}`}>
                  <NavLink 
                    to={`/profile/${otherUser.username}/about`} 
                    style={{textDecoration: 'none'}}
                  >
                    <p className='user-profile-nav-text'>ABOUT</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>  

          { !about && otherUserVideos.length !== 0 &&
            <div className='user-profile-video-card-grid'>
            <hr style={{color: 'gray'}} />
            { otherUserVideos.map( video => (
              <VideoGridCard 
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
          }
          { !about && otherUserVideos.length === 0 &&
          <div className='user-profile-video-list-empty-div'>
            <div className='user-profile-video-list-empty-message-card'>
              <img 
                className='user-profile-video-list-empty-message-image' 
                src='https://images.vexels.com/media/users/3/153398/isolated/preview/6217132e0bab331b16f2eaa94d0ec4f9-video-tape-reel-flat-icon-by-vexels.png'
                alt = ''  
              />
              <h4 className='user-profile-video-list-empty-message'>
                There's nothing here yet
              </h4>
            </div>
          </div>

          }
          { about && 
          <div className='user-profile-about-div'>
            <div className='user-profile-about-details'>
              <h5 className='user-profile-name'>Name: {otherUser.firstName} {otherUser.lastName}</h5>
              <h5 className='user-profile-num-videos'>Published Videos: {otherUser.videos.length}</h5>
              <h5 className='user-profile-email'>Email: {otherUser.email}</h5>
              <h5 className='user-profile-joined-date'>Joined At: {otherUser.createdAt}</h5>
              <h5 className='user-profile-about'>About: 
                {otherUser.about} 
              </h5>
            </div>
          </div>

          }
        </div>
      }
    </>

  );  
}

export default Profile;
