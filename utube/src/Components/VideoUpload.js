import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import useFormHandler from '../hooks/useFormHandler';
import './VideoUpload.css'
import LoadingSpinner from './LoadingSpinner';

const VideoUpload = () => {
  const [ url, setUrl] = useState('');
  const [ showSubmitButton, setShowSubmitButton] = useState(false);
  const [ showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [ videoUploaded, setVideoUploaded ] = useState(false);
  
  const [ thumbnailUrl, setThumbnailUrl ] = useState(false); 
  const { user } = useContext(UserContext);
  const history = useHistory();
  

  const [ data, handleChange, handleSubmit, errorMessage ] = useFormHandler({ 
    apiMethod: 'makeVideo', 
    globalUpdateFunction: setVideoUploaded,
  });

  const fileSelect = useRef(null);


  const uploadFile = async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dilw67t91/upload";
    const formData = new FormData();

    formData.append("file", file[0]);
    formData.append("upload_preset", "mszj6nzh");

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });

    console.log('The response: ', res);
    const resJson = await res.json();
    setUrl(resJson.secure_url);
    const thumbUrl = resJson.secure_url.substring(0, resJson.secure_url.length - 3) + 'jpg';
    setThumbnailUrl(thumbUrl);
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
        <FormGroup>
          <Label className='upload-form-label' for='url'>File</Label>
          <Input 
            ref={fileSelect}
            type='file'
            accept='video/*'
            style={{ width: '20em', float: 'left', marginLeft: '1.5em' }}
            name='url'
            id='file'            
            onChange={(evt) => handleFile(evt.target.files)}
          />
          <div style={{float: 'right', width:'3em', height: '2.8em'}}>
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