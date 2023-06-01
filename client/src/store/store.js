import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slices/messageSlice';
import userReducer from '../slices/userSlice';

const Store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});

export default Store;
