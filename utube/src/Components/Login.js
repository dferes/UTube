import { useContext, useEffect} from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import useFormHandler from '../hooks/useFormHandler';
import './Login.css';


const Login = () => {
  const history = useHistory();
  // const {user, handleFormSubmit, handleFormChange, loginFormData} = useContext(FormContext);
  // if(!errorMessage.logIn && user.username)  history.push('/');
  const { setUserTokenAndUsername, user } = useContext(UserContext);
  const [ data, handleChange, handleSubmit ] = useFormHandler({ 
    apiMethod: 'login', 
    globalUpdateFunction: setUserTokenAndUsername    
  });

  useEffect( () => {
    if(user.token) history.push('/');
  }, [user, history]); 

  return (
    <div className='login-form-div'>
      <h2 className='login-message' >Log In</h2>  
      <Form className='login-form' onSubmit={async (evt) => await handleSubmit(evt)}>
        <FormGroup>
          <Label className='login-from-label' for='username'>Username</Label>
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
          <Label for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              value={data.password}
              onChange={handleChange}  
            />
        </FormGroup>
        {/* { errorMessage.logIn && 
          <div className='bad-login-div'>
            <p className='bad-login-message'>{errorMessage.logIn}</p>
          </div>      
        } */}
        <Button color='primary' className='login-button'>Log In</Button>
      </Form>
      <div className='signup-div'>
        <p className='signup-message'>Don't have an account yet? Sign up for free!</p>
        <Button outline color='primary' href='/signup'>SIGN UP</Button>
      </div>
    </div>  
  );
};

export default Login;