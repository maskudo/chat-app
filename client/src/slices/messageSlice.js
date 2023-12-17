import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { allMessagesRoute } from '../utils/APIRoutes';

const initialState = {
  messages: null,
  newMessage: null,
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
    return data.data;
  }
);

export const sendNewMessage = createAsyncThunk(
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
    data = await axios.post(route, message, config);
    return data.data;
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages = [...state.messages, newMessage];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.messages = null;
        state.error = action.error.message;
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.newMessage = action.payload;
        state.error = null;
      })
      .addCase(sendNewMessage.rejected, (state, action) => {
        state.newMessage = null;
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
export const { addNewMessage } = messageSlice.actions;
