import React, {ChangeEvent, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import {Grid, IconButton} from "@mui/material";
import styles from '../styles/Player.module.scss';
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";

let audio;

const Player = () => {
  const {pause, active, volume, currentTime, duration} = useTypedSelector(state => state.player);
  const {pauseTrack, playTrack, setVolume, setActiveTrack, setDuration, setCurrentTime} = useAction();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    setAudio();
    play();

  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `http://localhost:5000/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }

  const play = () => {
    if (!active) {
      return false;
    }
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  }

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = +e.target.value;
    setVolume(volume);
    audio.volume = volume / 100;
  }

  const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
    const time = +e.target.value;
    setCurrentTime(time);
    audio.currentTime = time;
  }

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow/> : <Pause/>}
      </IconButton>
      <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
        <div>{active?.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress left={volume} right={100} onChange={changeVolume}/>
    </div>
  );
};

export default Player;
