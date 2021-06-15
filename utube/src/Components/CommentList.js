import { useContext } from 'react';
import Comment from './Comment';
import useFormHandler from '../hooks/useFormHandler';
import UserContext from '../FormContext';
import './CommentList.css';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';


const CommentList = ({ comments }) => {
  const { user, currentVideo, setComment } = useContext(UserContext);  
  const [  
    data, 
    handleChange, 
    handleSubmit
  ] = useFormHandler({ 
      apiMethod: 'setVideoComment', 
      globalUpdateFunction: setComment,
      starterData: {username: user.username, videoId: currentVideo.id}    
    });
  
  const thisUserAvatar = user.avatarImage ? user.avatarImage: defaultAvatarImage;

  return (
    <div className='comment-list-div'>
      <h2 className='comment-list-number-comments'>{comments.length} Comments</h2>  
      <div className='comment-list-comment-form-div'>
        <img  src={thisUserAvatar} alt='' className='comment-list-this-user-avatar' />  
        <form 
          className='comment-list-comment-form'
          onSubmit={ async (evt) => await handleSubmit(evt)} 
        >
          <label htmlFor='comment-input' />
          <input 
            className='comment-input'
            id='comment-input'
            name='content'
            placeholder='Add a public comment...'
            value={data.content}
            onChange={handleChange}
          />
          <div className='comment-form-button-div'>
            {/* <button className='comment-form-cancel-button'>CANCEL</button> */}
            <button className='comment-form-submit-button'>COMMENT</button>
          </div>
        </form>  
      </div>  
      {
        comments.map( comment => (
          <Comment 
            key={comment.id}
            id={comment.id}
            createdAt={comment.createdAt}
            username={comment.username}
            content={comment.content}  
          />
        ))  
      }  
    </div>  
  );  
}

export default CommentList;