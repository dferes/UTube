import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import useFormHandler from '../hooks/useFormHandler';
import './VideoUpload.css'
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const VideoUpload = () => {
  const [ url, setUrl] = useState('');
  const [ showSubmitButton, setShowSubmitButton] = useState(false);
  const [ showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [ videoUploaded, setVideoUploaded ] = useState(false);
  
  const [ thumbnailUrl, setThumbnailUrl ] = useState(false); 
  const { user } = useContext(UserContext);
  const history = useHistory();
  

  const [ data, handleChange, handleSubmit, errorMessage, setErrorMessage ] = useFormHandler({ 
    apiMethod: 'makeVideo', 
    globalUpdateFunction: setVideoUploaded,
  });

  const fileSelect = useRef(null);


  const uploadFile = async (file) => {
    setErrorMessage('');
    const url = "https://api.cloudinary.com/v1_1/dilw67t91/upload";
    const formData = new FormData();
    
    try {
      if (file[0].size > 100000000) {
        throw new RangeError();
      }

      formData.append("file", file[0]);
      formData.append("upload_preset", "mszj6nzh");

      const res = await axios.post(url, formData);
      setUrl(res.data.secure_url);
      const thumbUrl = res.data.secure_url.substring(0, res.data.secure_url.length - 3) + 'jpg';
      setThumbnailUrl(thumbUrl);
    }catch( err ) {
      setShowLoadingSpinner(false);
      setShowSubmitButton(false);
      if ( err instanceof RangeError ) {
        setErrorMessage('The maximum file size is 100.00 MB');
      }else {
        setErrorMessage('Unsupported video format or file');
      }
    }

  }


  const handleFile = (file) => {
    setShowLoadingSpinner(true);
    uploadFile(file);
  }

  useEffect( () => {
    if(thumbnailUrl) {
      setShowLoadingSpinner(false);
      setShowSubmitButton(true);
    }

  }, [thumbnailUrl, setShowLoadingSpinner, setShowSubmitButton]);


  useEffect( () => {
    if(videoUploaded){
      history.push(`/profile/${user.username}`);
    } 
  }, [videoUploaded, user, history]);



  return (
    <div className='upload-form-div'>
      <Form 
        className='upload-form'
        onSubmit={ async (evt) => await handleSubmit(evt, {
          username: user.username,
          url: url,
          thumbnailImage: thumbnailUrl
        })} 
      >
        <FormGroup >
          <Label 
            style={{
              width: '10em',
              textAlign: 'left',
              marginBottom: '0.3em',
              marginTop: '0.5em'
            }} 
            className='upload-form-label' 
            for='url'>File
          </Label>
          <Input 
            ref={fileSelect}
            type='file'
            accept='video/*'
            style={{ float: 'left', width: '23em' }}
            name='url'
            id='file'            
            onChange={(evt) => handleFile(evt.target.files)}
          />
          <div style={{float: 'right', width:'3em', height: '2.2em'}}>
            { showLoadingSpinner  && <LoadingSpinner /> }
          </div>
        </FormGroup>
        <FormGroup>
          <Label className='upload-form-label' for='title'>Title</Label>
            <Input 
              autoFocus
              type='text'
              name='title'
              id='title'
              value={data.title}
              placeholder='Title'
              onChange={handleChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label className='upload-form-label' for='description'>Description</Label>
          <Input type='textarea'
            name='description'
            id='about'
            placeholder='Description'
            value={data.description}
            onChange={handleChange}
          />
        </FormGroup>
        { errorMessage && 
          <div className='bad-upload-div'>
            <p className='bad-upload-message'>{errorMessage}</p>
          </div>      
        }
        { showSubmitButton &&
          <Button color='primary' className='upload-form-button'>Upload</Button>
        }
      </Form>
    </div>
  );  
}

export default VideoUpload;