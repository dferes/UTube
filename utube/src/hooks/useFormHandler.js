import { useState } from 'react';
import UTubeApi from '../api';


const useFormHandler = ({ apiMethod, globalUpdateFunction, starterData={} }) => {
  const [ data, setData ] = useState( {...starterData} );
    
  const handleChange = evt => {
    const { name, value } = evt.target;
    setData( data => ({...data, [name]: value}));
  };
    
  const handleSubmit = async evt => {
    evt.preventDefault();
    let res = await UTubeApi[ [apiMethod] ](data);
    if(data.password) delete data.password;
    res = {...res, ...data};
    await globalUpdateFunction( res );
  };

  return [ data , handleChange, handleSubmit ];
};

export default useFormHandler;