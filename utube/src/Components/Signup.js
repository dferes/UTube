import { useContext} from 'react';
import UserContext from '../FormContext';
// import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import useFormHandler from '../hooks/useFormHandler';
import './Signup.css';


const Signup = () => {
  // const history = useHistory();
  // const {user, signupFormData, handleFormChange, handleFormSubmit} = useContext(FormContext);
  // if ( !errorMessage.signup && user.username ) history.push('/');
  const { setUserTokenAndUsername } = useContext(UserContext);
  const [ data, handleChange, handleSubmit ] = useFormHandler({ 
    apiMethod: 'signup', 
    globalUpdateFunction: setUserTokenAndUsername    
  });


  return (
    <div className='signup-form-div'>
      <h2 className='signup-form-div-signup-message'>Sign Up</h2>
      <Form onSubmit={ async (evt) => await handleSubmit(evt)} className='signup-form'>
        <FormGroup>
          <Label className='signup-form-label' for='username'>Username</Label>
            <Input 
              autoFocus
              type='text'
              name='username'
              id='username'
              value={data.username}
              onChange={handleChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label className='signup-form-label' for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              value={data.password}
              onChange={handleChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label className='signup-form-label' for='firstName'>First Name</Label>
            <Input  
              type='text'
              name='firstName'
              id='firstName'
              value={data.firstName}
              onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className='signup-form-label' for='lastName'>Last Name</Label>
            <Input 
              type='text'
              name='lastName'
              id='lastName'
              value={data.lastName}
              onChange={handleChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label className='signup-form-label' for='email'>Email</Label>
            <Input 
              type='email'
              name='email'
              id='email'
              value={data.email}
              onChange={handleChange}
            />
        </FormGroup>
        {/* { errorMessage.signup && 
          <div className='bad-signup-div'>
            <p className='bad-signup-message'>{errorMessage.signup}</p>
          </div>      
        }  */}
        <Button color='primary' className='signup-form-button'>Sign Up</Button>
      </Form>
    </div>  
  );  
};

export default Signup;