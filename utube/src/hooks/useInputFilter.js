import { useState } from 'react';
import UTubeApi from '../api';


const useInputFilter = ({ defaultList=[], apiMethod, termKey, globalUpdateFunction }) => {
  const [ filter, setFilter ] = useState({ [termKey]: ''});
    
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFilter( data => ({...data, [name]: value}));
  };
    
  const handleSubmit = async evt => {
    evt.preventDefault();
    const filterTerm = Object.keys(filter);

    globalUpdateFunction(
      filter[filterTerm[0]] === '' ?
        defaultList
        : await UTubeApi[ [apiMethod] ](filter)
    );
  };

  return [ filter, handleChange, handleSubmit ];
};

export default useInputFilter;