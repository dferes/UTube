import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import UTubeApi from '../api';
import Navbar from './Navbar';
import FormContext from '../FormContext';
import useLocalStorage from '../hooks/useLocalStorage';
import './App.css';


function App() {
  const [ loginFormData, setLoginFormData ] = useState({});
  const [ signupFormData, setSignupFormData ] = useState( {} );
  const [ userFormData, setUserFormData ] = useState({});

  const [ userToken, setUserToken ] = useLocalStorage('userToken', '');
  const [ user, setUser ] = useLocalStorage('user',  {} );
  const [ isLoggedIn, setIsLoggedIn ] = useLocalStorage('isLoggedIn', false);

  const [ errorMessage, setErrorMessage ] = useState({});
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);

  /** Logs the user out if isLoggedIn changes to false */
  useEffect( () => {
    const logout = () => {
      setUserToken('');
      setUser({});
      resetUserFormData();
    };
  
    if (!isLoggedIn) logout();
  }, [isLoggedIn, setUserToken, setUser]);


  const resetUserFormData = () => {
    setLoginFormData({});
    setSignupFormData({});
    setUserFormData({});
  };
  
  const handleUserFormChange = (evt, login=false, signup=false) => {
    const { name, value } = evt.target;
    if (login) setLoginFormData( data => ({...data, [name]: value}) );
    else if(signup)setSignupFormData( data => ({...data, [name]: value}) );
    else setUserFormData( data => ({...data, [name]: value}) );
  };

  const handleUserFormSubmit = async (evt, apiMethod, formInfo) => {
    evt.preventDefault();
    try {
      if(['logIn', 'signup'].includes(apiMethod)){ // can be logIn, signup or update
        const token = await UTubeApi[ [apiMethod] ](formInfo);
        setUserToken(token);
      }else {
        UTubeApi.setToken(userToken);
        await UTubeApi[ [apiMethod] ](formInfo);
      }
      const user_ = await UTubeApi.getUser(formInfo.username);
      setUser(user_);
      resetUserFormData();
      setErrorMessage({});
      setShowSuccessMessage(apiMethod==='update'? true: false);
      setIsLoggedIn(true);
    }catch(err) { setErrorMessage({ [apiMethod]: err }); }
  };

  const formFunctions = {
    user: user
    // handleFormChange: handleFormChange,
    // handleFormSubmit: handleFormSubmit,
    // loginFormData: loginFormData,
    // signupFormData: signupFormData,
    // userFormData: userFormData
  };

  return (
    <div className="App">
      <FormContext.Provider value={formFunctions}>
        <BrowserRouter>
          <Navbar 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
          />
          <main>
            <Routes 
              userToken={userToken}
              // errorMessage={errorMessage}
              // showSuccessMessage={showSuccessMessage}
              // setShowSuccessMessage={setShowSuccessMessage}
            />
          </main>
        </BrowserRouter>
      </FormContext.Provider>
    </div>
  );
}

export default App;
