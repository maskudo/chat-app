import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginRoute, registerRoute, setAvatarRoute } from '../utils/APIRoutes';

const userFromLocalStorage = await JSON.parse(
  localStorage.getItem('chat-app-user')
);
const initialState = {
  user: userFromLocalStorage,
  selectedContact: null,
  selectedContactOnlineStatus: false,
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
    localStorage.setItem('token', data.token);
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
    localStorage.setItem('token', data.token);
    return data;
  }
);

// TODO: Update this
export const updateAvatar = createAsyncThunk(
  'user/avatar',
  async ({ user, avatarImage }) => {
    // const token = localStorage.getItem('token');
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // const res = await axios.patch(
    //   `${setAvatarRoute}/${user?._id}/setavatar`,
    //   avatarImage,
    //   config
    // );
    // return res.data.user;
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
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('chat-app-user', JSON.stringify(action.payload));
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setSelectedContactOnlineStatus: (state, action) => {
      state.selectedContactOnlineStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const {
  logoutUser,
  updateUser,
  setSelectedContact,
  setSelectedContactOnlineStatus,
} = userSlice.actions;
