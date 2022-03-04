import UTubeApi from '../api';

const subscribeClick = async (user, currentVideo) => {
    await UTubeApi.setSubscription( {
      subscriberUsername: user.username, 
      subscribedToUsername: currentVideo.username 
    });

  };

  const unsubscribeClick = async (user, currentVideo) => {
    await UTubeApi.unsubscribe( {
      subscriberUsername: user.username, 
      subscribedToUsername: currentVideo.username 
    });

  };

  const getSubscriptions = async (username) => {
  return await UTubeApi.getSubscriptions({subscriberUsername: username});
  }

  export { subscribeClick, unsubscribeClick, getSubscriptions }