import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../FormContext';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import useFormHandler from '../hooks/useFormHandler';
import './VideoUpload.css'

const VideoUpload = () => {
  const [ url, setUrl] = useState('');      // --------------setUrl when video has been uploaded to cloud
  const [ showSubmitButton, setShowSubmitButton] = useState(false);
  const [ videoUploaded, setVideoUploaded ] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();
  // cloud name:                 dilw67t91
  // unsigned upload preset:     mszj6nzh
  // API Key:                    956736391961359
  // API SecretKey:              jKNTP4fx5B3E3bfUhGuXRuqEJLc
  // API Environment Variable:   CLOUDINARY_URL=cloudinary://956736391961359.jKNTP4fx5B3E3bfUhGuXRuqEJLc@dilw67t91 

  const [ data, handleChange, handleSubmit, errorMessage ] = useFormHandler({ 
    apiMethod: 'makeVideo', 
    globalUpdateFunction: setVideoUploaded,
  });

  const fileSelect = useRef(null);


  const uploadFile = async (file) => {
    console.log('The file Data: ', file[0]);
    const url = "https://api.cloudinary.com/v1_1/dilw67t91/upload";

    const formData = new FormData();

    formData.append("file", file[0]);
    formData.append("upload_preset", "mszj6nzh");
    console.log('formData: ', formData);

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });
    console.log('res---------->',res.url);
    setUrl(res.url);
  }


  // const handleVideoUpload = async () => {
  //   if (fileSelect) {
  //     console.log('file selected: ', fileSelect);
  //     fileSelect.current.click();
  //   }
  // }

  const handleFile = (file) => {
    console.log('the file is: ', file);
    uploadFile(file);
  }

  useEffect( () => {
    if(url){
      setShowSubmitButton(true);
      console.log('------------>>>>>>useEffect');
    } 
  }, [url]);


  useEffect( () => {
    if(videoUploaded){
      console.log('------------>>>>>>useEffect2');
      history.push(`/profile/${user.username}`);
    } 
  }, [videoUploaded, user, history]);


  return (
    <div className='upload-form-div'>
      <Form 
        className='upload-form'
        onSubmit={ async (evt) => await handleSubmit(evt, {
          username: user.username,
          url: url
        })} 
      >
        <FormGroup>
            <Label className='upload-form-label' for='url'>File</Label>
            {/* <Button color='primary'
              className="upload-form-browse-button"
              onClick={handleVideoUpload}
              type="button"
            >
              Browse
            </Button> */}
            <Input 
              ref={fileSelect}
              type='file'
              accept='video/*'
              // style={{ display: 'none' }}
              name='url'
              id='file'            
              onChange={(evt) => handleFile(evt.target.files)} // target.files or target.file ?????
          />
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
          <Label className='upload-form-label' for='description'>About</Label>
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