import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import authReducer from './slice/authSlice';
import userSlice from './slice/userSlice';
import chatSlice from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userSlice,
    chat: chatSlice,
  },
});

export default store;
