import React from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';


const Comment = ({ createdAt, username, content, userAvatar }) => {

    return (
      <div className='comment-column-div'>
        <div className='comment-div-user-avatar-div'>
          <Link to={`/profile/${username}`}>
            <img 
              className='comment-div-user-avatar' 
             src={userAvatar}
              alt=''
            />
          </Link>
        </div>
        <div className='comment-row-div'>
          <div className='comment-div-username-and-date-div'>
            <p className='comment-div-username'>{username}</p>
            <p className='comment-div-date'>{createdAt}</p>
          </div>
          <div className='comment-div-content-div'>
            <p className='comment-div-content'>{content}</p>
          </div>  
        </div>
      </div>  
    );  
  }
  
  export default Comment;