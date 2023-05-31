import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allMessagesRoute } from '../utils/APIRoutes';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};
export const getAllMessages = createAsyncThunk(
  'messages/get-all-messages',
  async ({ currentUserId, selectedContact }) => {
    let data = [];
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const route = `${allMessagesRoute}/${currentUserId}/${selectedContact}`;
    data = await axios.get(route, config);
    return data;
  }
);

export const sendMessage = createAsyncThunk(
  'messages/send-message',
  async ({ message }) => {
    let data = [];
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const route = `${allMessagesRoute}`;
    data = await axios.get(route, message, config);
    return data;
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.messages = null;
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
