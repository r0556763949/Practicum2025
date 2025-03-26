import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './FileSlice'; // סלאיס הקבצים
import remarksReducer from './ReMarkSlice';

const store = configureStore({
  reducer: {
    files: filesReducer,
    remarks: remarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
