import React from 'react';
import { Link } from 'react-router-dom';
import './SubscriptionCard.css';

const SubscriptionCard = ({ username, userAvatar, userHeader }) => {
  return (
    <div className='subscription-card-main-div'>
      <Link to={`/profile/${username}`} 
        style={{
          width: '16em',
          textDecoration: 'none' 
        }}
      >
        <div 
          className='subscription-card-header-div'
          style={{
            backgroundImage: `url(${userHeader})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat' 
          }}
        >
          <img 
            className='subscription-card-user-avatar'
            src={userAvatar}
            alt=''  
          />    
        </div>
        <div style={{height: '7em'}} className='subscription-card-row2'>
          <p className='subscription-card-username'>@{username}</p>
        </div>
      </Link>
    </div>    
  );  
}

export default SubscriptionCard;