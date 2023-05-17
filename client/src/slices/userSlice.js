import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const initialState = {
  user: null,
  loading: true,
  error: null,
};
export const registerUser = createAsyncThunk(
  'user/register',
  ({ username, password }) =>
    axios
      .post(
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
      )
      .then(({ data }) => {
        console.log(data);
        return data;
      })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
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
        (state.user = null), (state.error = action.error.message);
      });
  },
});

export default userSlice.reducer;
// module.exports = userSlice.reducer;
// module.exports.registerUser = registerUser;
