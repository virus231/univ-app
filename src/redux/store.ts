import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authSlice} from './reducers/authSlice'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


export const store = configureStore({
  reducer: {
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
