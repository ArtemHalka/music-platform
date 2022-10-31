import {PlayerAction, PlayerActionTypes} from "../../types/player";
import {ITrack} from "../../types/track";

export const playTrack = (): PlayerAction => ({
  type: PlayerActionTypes.PLAY
});

export const pauseTrack = (): PlayerAction => ({
  type: PlayerActionTypes.PAUSE
});

export const setDuration = (payload: number): PlayerAction => ({
  type: PlayerActionTypes.SET_DURATION,
  payload
});

export const setVolume = (payload: number): PlayerAction => ({
  type: PlayerActionTypes.SET_VOLUME,
  payload
});

export const setCurrentTime = (payload: number): PlayerAction => ({
  type: PlayerActionTypes.SET_CURRENT_TIME,
  payload
});

export const setActiveTrack = (payload: ITrack | null): PlayerAction => ({
  type: PlayerActionTypes.SET_ACTIVE,
  payload
});

