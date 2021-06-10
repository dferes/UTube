import { useState } from 'react';
import UTubeApi from '../api';


const useInputFilter = ({ defaultList, apiMethod, termKey }) => {
  const [ filter, setFilter ] = useState({ [termKey]: ''});
  const [ resultList, setResultList ] = useState(defaultList);
  const [ isEmpty, setIsEmpty ] = useState(false);
    
  const handleChange = evt => {
    const { name, value } = evt.target;  
    setFilter( data => ({...data, [name]: value}));
  };
    
  const handleSubmit = async evt => {
    evt.preventDefault();  
    const filterTerm = Object.keys(filter);

    const res = filter[filterTerm[0]] === '' ?
      defaultList
      : await UTubeApi[ [apiMethod] ](filter);

    setResultList(res);
    setIsEmpty( res.length === 0 ? true: false );
  };

  return [ resultList, filter, handleChange, handleSubmit, isEmpty ];
};

export default useInputFilter;