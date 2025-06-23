// In frontend > redux > fileSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const uploadFile = createAsyncThunk('file/upload', async (formData) => {
  const res = await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return await res.json(); // contains { message, preview }
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    preview: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.preview = action.payload.preview;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
