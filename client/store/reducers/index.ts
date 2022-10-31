import {AnyAction, combineReducers} from "redux";
import {HYDRATE} from 'next-redux-wrapper';
import {playerReducer} from "./playerReducer";
import {trackReducer} from "./trackReducer";
import {ThunkDispatch} from "redux-thunk";

export const rootReducer = await combineReducers({
  player: playerReducer,
  track: trackReducer,
});


export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export type RootState = ReturnType<typeof rootReducer>;

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
