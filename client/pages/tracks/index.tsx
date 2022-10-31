import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchTracks, searchTracks} from "../../store/action-creators/tracks";
import {NextThunkDispatch} from "../../store/reducers";

const Index = () => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch() as NextThunkDispatch;
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(async () => {
      await dispatch(await searchTracks(e.target.value));
    }, 500));
  }

  if (error) {
    return (
      <MainLayout title={'Error'}>
        <h1>{error}</h1>
      </MainLayout>
    )
  }


  return (
    <MainLayout title={'Track List'}>
      <Grid container justifyContent='center'>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Track list</h1>
              <Button
                onClick={() => router.push('/tracks/create')}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
