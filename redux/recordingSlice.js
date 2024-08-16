import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRecordingDialogOpen: false,
};

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    toggleRecordingDialog(state) {
      state.isRecordingDialogOpen = !state.isRecordingDialogOpen;
    },
  },
});

export const { toggleRecordingDialog } = recordingSlice.actions;
export default recordingSlice.reducer;
