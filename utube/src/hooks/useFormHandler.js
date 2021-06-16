import { useState } from 'react';
import UTubeApi from '../api';


const useFormHandler = ({ apiMethod, globalUpdateFunction, starterData={} }) => {
  const [ data, setData ] = useState( {...starterData} );
    
  const handleChange = evt => {
    const { name, value } = evt.target;
    setData( data => ({...data, [name]: value}));
  };
    
  const handleSubmit = async (evt, extraData=null) => {
    evt.preventDefault();
    let objectParameter = data;
    if(extraData) objectParameter = { ...objectParameter, ...extraData};
    
    let res = await UTubeApi[ [apiMethod] ](objectParameter);
    if(data.password) delete data.password;
    res = {...res, ...data};           // this may be unnecessary, double check

    await globalUpdateFunction( res );
    setData({});
    evt.target.reset();
  };

  return [ data, handleChange, handleSubmit ];
};

export default useFormHandler;