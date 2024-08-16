import { configureStore } from '@reduxjs/toolkit';
import recordingReducer from './recordingSlice';

const store = configureStore({
  reducer: {
    recording: recordingReducer,
  },
});

export default store;
