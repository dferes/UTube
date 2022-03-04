import { useState } from 'react';
import UTubeApi from '../api';


const useFormHandler = ({ apiMethod, globalUpdateFunction, successMessage_='' }) => {
  const [ data, setData ] = useState( {} );
  const [ errorMessage, setErrorMessage] = useState('');
  const [ successMessage, setSuccessMessage] = useState('');
    
  const handleChange = evt => {
    const { name, value } = evt.target;
    setData( data => ({...data, [name]: value}));
  };

    
  const handleSubmit = async (evt, extraData=null) => {
    evt.preventDefault();
    try {
      let objectParameter = data;
      if(extraData) objectParameter = { ...objectParameter, ...extraData};
      let res = await UTubeApi[ [apiMethod] ](objectParameter);
      res = {...res, ...data}; 
      
      if(data.password) delete data.password;
      await globalUpdateFunction( res );
      setData({});
      evt.target.reset();
      if (successMessage_) setSuccessMessage(successMessage_);
    } 
    catch(err) {
      setErrorMessage(err);
    } 

  };

  return [ data, handleChange, handleSubmit, errorMessage, setErrorMessage, successMessage, setSuccessMessage ];
};


export default useFormHandler;