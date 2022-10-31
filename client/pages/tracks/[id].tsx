import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";
import {ITrack} from "../../types/track";

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const comment = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: comment.value,
        trackId: track._id
      });
      setTrack({...track, comments: [...track.comments, response.data]});
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <MainLayout title={`${track.name} - ${track.artist}`}>
      <Button
        onClick={() => router.push('/tracks')}
        variant={'outlined'}
        style={{fontSize: 32}}
      >
        Back to list
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <img src={`http://localhost:5000/${track.picture}`} width={200} height={200}/>
        <div style={{marginLeft: 30}}>
          <h1>Title: {track.name}</h1>
          <h2>Artist: {track.artist}</h2>
          <h3>Listened: {track.listens}</h3>
        </div>
      </Grid>
      <h2>Lyrics</h2>
      <p>{track.text}</p>
      <Grid container>
        <h3>Comments</h3>
        <TextField
          label='Your name'
          fullWidth
          sx={{mb: 2}}
          {...username}
        />
        <TextField
          label='Your comment'
          fullWidth
          multiline
          rows={4}
          sx={{mb: 2}}
          {...comment}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map((comment, index) =>
          <div key={index}>
            <div>{comment.username}</div>
            <div>{comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id);
  return {
    props: {
      serverTrack: response.data
    }
  };
}
