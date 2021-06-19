import { useState } from 'react';
import UTubeApi from '../api';


const useFormHandler = ({ apiMethod, globalUpdateFunction, starterData={}, successMessage_='' }) => {
  const [ data, setData ] = useState( {...starterData} );
  const [ errorMessage, setErrorMessage] = useState(false);
  const [ successMessage, setSuccessMessage] = useState(false);
    
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
      res = {...res, ...data};           // this may be unnecessary, double check
      
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

  return [ data, handleChange, handleSubmit, errorMessage, successMessage, setSuccessMessage ];
};

export default useFormHandler;