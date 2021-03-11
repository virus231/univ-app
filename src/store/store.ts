import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import {authSlice} from '../redux/auth/authSlice'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice.reducer
  },
  middleware: [logger, thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
