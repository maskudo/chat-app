import { configureStore } from '@reduxjs/toolkit';
// import messageSlice from '../slices/messageSlice';
import userReducer from '../slices/userSlice';

const Store = configureStore({
  reducer: {
    user: userReducer,
    // message: messageSlice,
  },
});

export default Store;
