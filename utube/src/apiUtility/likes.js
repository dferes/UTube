import UTubeApi from '../api';

const likeClick = async (user, currentVideo) => {    
    await UTubeApi.setVideoLike( {
       videoId: currentVideo.id, 
       username: user.username 
     });
 
   };
 
   const unlikeClick = async (user, currentVideo) => {
     await UTubeApi.unlike( {
       videoId: currentVideo.id, 
       username: user.username 
     });
 
   };

export { likeClick, unlikeClick }   