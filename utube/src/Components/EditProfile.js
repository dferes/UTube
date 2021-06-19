import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import useFormHandler from '../hooks/useFormHandler';
import './EditProfile.css';


const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  
  const [ data, handleChange, handleSubmit, errorMessage, successMessage, setSuccessMessage ] = useFormHandler({ 
    apiMethod: 'userUpdate', 
    globalUpdateFunction: setUser,
    successMessage_: 'Your profile has been updated!'    
  });

  
  useEffect( () => {
    if(successMessage) {
      setSuccessMessage('');
      history.push(`/profile/${user.username}`);
    }

  }, [successMessage, setSuccessMessage, user]);


  return (
    <div className='edit-profile-main-div'>
      <Form 
        onSubmit={ async (evt) => handleSubmit(evt, {username: user.username})} 
        className='edit-profile-form'
      >
        <FormGroup >
          <p className='edit-username-display'>Username</p>
          <p className='edit-username-value'>{user.username}</p>
        </FormGroup>
        <FormGroup >
          <p className='edit-email-display'>Email</p>
          <p className='edit-email-value'>{user.email}</p>
        </FormGroup>
        <FormGroup>
          <Label className='update-firstName-label' for='firstName'>First Name</Label>
          <Input
            type='text'
            name='firstName'
            id='firstName'
            placeholder={user.firstName} 
            value={data.firstName}
            onChange={handleChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label className='update-lastName-label' for='lastName'>Last Name</Label>
          <Input
            type='text'
            name='lastName'
            id='lastName'
            placeholder={user.lastName}
            value={data.lastName}
            onChange={handleChange}  
          />
          </FormGroup>  
        <FormGroup>
          <Label className='update-avatar-label' for='avatarImage'>Avatar</Label>
          <Input
            type='text'
            name='avatarImage'
            id='avatarImage'
            placeholder={user.avatarImage}
            value={data.avatarImage}
            onChange={handleChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label className='update-coverImage-label' for='headerImage'>Header</Label>
          <Input
            type='text'
            name='coverImage'
            id='coverImage'
            placeholder={user.coverImage}
            value={data.coverImage}
            onChange={handleChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label className='update-about-label' for='about'>About</Label>
          <Input type='textarea'
            name='about'
            id='about'
            placeholder={user.about}
            value={data.about}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className='update-form-password-label' for='password-confirm'>Confirm Password</Label>
          <Input
            required={true}
            type='password'
            name='password'
            id='password'
            value={data.password}
            onChange={handleChange}  
          />
        </FormGroup>
        { errorMessage && 
          <div className='bad-update-div'>
            <p className='bad-update-message'>{errorMessage}</p>
          </div>      
        }
        <Button className='edit-profile-button' color='primary'>Save Changes</Button>   
      </Form>
    </div>  
  );  
}

export default EditProfile;