import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginRoute, registerRoute } from '../utils/APIRoutes';
import toastOptions from '../utils/toastOptions';

const userFromLocalStorage = await JSON.parse(
  localStorage.getItem('chat-app-user')
);
const initialState = {
  user: userFromLocalStorage,
  loading: false,
  error: null,
};
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, password }) => {
    const response = await axios.post(
      registerRoute,
      {
        username,
        password,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const { data } = response;
    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    const response = await axios.post(
      loginRoute,
      {
        username,
        password,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const { data } = response;
    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
    console.log(data);
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.clear();
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
