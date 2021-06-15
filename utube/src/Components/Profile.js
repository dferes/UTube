import { useContext } from 'react';
import UserContext from '../FormContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='user-info-div'>
      <h1 style={{color: 'white'}}>TO DO:</h1>
      <h2>username: {user.username}</h2>
      <h2>First Name: {user.firstName}</h2>
      <h2>Last Name: {user.lastName}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Number of subscriptions: {user.subscriptions.length}</h2>
      <h2>Number of subscribers {user.subscribers.length}</h2>
      <h2>Number of Videos published: {user.videos.length}</h2>
    </div>  
  );  
}

export default Profile;
