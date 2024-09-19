import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../src/services/axiosInstance';

const initialState = {
  chatList: [],
  isChatListLoading: false,
  error: null,
};

export const getAllChat = createAsyncThunk(
  'chat/getAllChat',
  async ({room}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`/chat/messages/${room}`);
      console.log('response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllChat.pending, state => {
        state.isChatListLoading = true;
        state.error = null;
      })
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.isChatListLoading = false;
        state.chatList = action.payload;
      })
      .addCase(getAllChat.rejected, (state, action) => {
        state.isChatListLoading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
