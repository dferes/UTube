import { useContext } from 'react';
import Comment from './Comment';
import useInputFilter from '../hooks/useInputFilter';
import UserContext from '../FormContext';
import './CommentList.css';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';


const CommentList = ({ comments }) => {
  const { user } = useContext(UserContext);  
  const [  
    filter, 
    handleChange, 
    handleSubmit
  ] = useInputFilter({ apiMethod: 'addComment', globalUpdateFunction: 'setComment'} );
  
  const thisUserAvatar = user.avatarImage ? user.avatarImage: defaultAvatarImage;

  return (
    <div className='comment-list-div'>
      <h2 className='comment-list-number-comments'>{comments.length} Comments</h2>  
      <div className='comment-list-comment-form-div'>
        <img  src={thisUserAvatar} alt='' className='comment-list-this-user-avatar' />  
        <form 
          className='comment-list-comment-form'
          onSubmit={ async (evt) => {
            await handleSubmit(evt);
            console.log('-0000000000000000000000000000--------->>>');
          }} 
        >
          <label htmlFor='comment-input' />
          <input 
            className='comment-input'
            id='comment-input'
            name='comment-input'
            placeholder='Add a public comment...'
            value={filter.comment}
            onChange={handleChange}
          />
          <div className='comment-form-button-div'>
            <button className='comment-form-cancel-button'>CANCEL</button>
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