import { useState, useEffect, useContext } from 'react';
import UserContext from '../FormContext';
import UTubeApi from '../api';
import SubscriptionCard from './SubscriptionCard';
import './SubscriptionList.css';


const SubscriptionList = () => {
  const { user } = useContext(UserContext);
  const [ readyToRender, setReadyToRender ] = useState(false);
  const [ subscriptions, setSubscriptions ] = useState([]);
   
  useEffect( () => {
    const getSubs = async () => {
      setSubscriptions( await UTubeApi.getSubscriptions({subscriberUsername: user.username}) );
    }

    getSubs();
    setReadyToRender(true); 
  }, [setReadyToRender, setSubscriptions, user]);


  return (
    <div className='subscriptions-list-div'>
    { readyToRender && subscriptions.length &&
      subscriptions.map( sub => (
        <SubscriptionCard 
          id={sub.subscribedToUsername}
          key={sub.subscribedToUsername}
          username={sub.subscribedToUsername}
          userAvatar={sub.userImages.userAvatar}
          userHeader={sub.userImages.userHeader}
        />
      ))
    }
    { !subscriptions.length && 
      <div className='subscriptions-empty-div'>
        <div className='subscriptions-empty-message-card'>
          <img 
            className='subscriptions-empty-list-empty-message-image' 
            src='https://images.vexels.com/media/users/3/153398/isolated/preview/6217132e0bab331b16f2eaa94d0ec4f9-video-tape-reel-flat-icon-by-vexels.png'
            alt = ''  
          />
          <h4 className='subscriptions-empty-list-empty-message'>
            No subscriptions yet. 
          </h4>
        </div>
      </div>
    }
    </div>
  );
}

export default SubscriptionList;