import { useContext } from 'react';
import UserContext from '../FormContext';
import VideoGridCard from './VideoGridCard';
import './Home.css';


const Home = () => {
  const { allVideoList } = useContext(UserContext);

  return (
    <div className='home-video-grid-div'>
      <hr className='home-video-grid-hr' />
      { allVideoList.map( video => (
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
  );
};

export default Home;