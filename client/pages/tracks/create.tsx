import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios.post('http://localhost:5000/tracks', formData)
        .then(() => router.push('/tracks'))
        .catch(e => console.log(e));
    }
  }
  const back = () => {
    setActiveStep(prev => prev - 1);
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {
          activeStep === 0 &&
          <Grid container direction='column' style={{padding: 20}}>
            <TextField
              {...name}
              label='Title'
              sx={{mb: 2}}
            />
            <TextField
              {...artist}
              label='Artist'
              sx={{mb: 2}}
            />
            <TextField
              {...text}
              multiline
              rows={3}
              label='Lyrics'
            />
          </Grid>
        }
        {
          activeStep === 1 &&
          <FileUpload
            setFile={setPicture}
            accept='image/*'
          >
            <Button>Upload thumbnail</Button>
          </FileUpload>
        }
        {
          activeStep === 2 &&
          <FileUpload
            setFile={setAudio}
            accept='audio/*'
          >
            <Button>Upload audio</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={activeStep === 0} onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
