import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';
import chartReducer from './slices/chartSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer,
    chart: chartReducer,
  },
});
