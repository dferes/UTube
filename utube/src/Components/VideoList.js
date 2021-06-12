// import React, { useEffect,  useContext } from 'react';
import { useContext } from 'react';
import FormContext from '../FormContext';
import VideoCard from './VideoCard';
import './VideoList.css';
const noResultImage = process.env.PUBLIC_URL + 'images/no_result_image.webp';

const VideoList = ( ) => {
//   const { user, videoSearchList } = useContext(FormContext);
const { videoSearchList } = useContext(FormContext);
  const isEmpty = videoSearchList.length === 0;
  return (
    <div className='video-search-result-list'>     
      <hr className='video-search-result-hr' />
      { !isEmpty && videoSearchList.map( video => (
        <VideoCard 
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
      { isEmpty && 
      <div className='no-results-div'>
        <img className='no-results-image' src={noResultImage} alt=''/>  
        <p className='no-results-msg'>No results found</p>
        <p className='no-results-msg-small'> Try different keywords</p>
      </div> }
    </div>
  );
}

export default VideoList;