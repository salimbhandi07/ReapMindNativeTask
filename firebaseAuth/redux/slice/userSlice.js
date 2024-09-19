import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../src/services/axiosInstance';
import Toast from 'react-native-toast-message';

const initialState = {
  contactForm: null,
  contactForms: [],
  isSubmitting: false,
  isLoading: false,
  isDeleting: false,
  error: null,
  isUserCountMonth: false,
  userCountMonth: [],
  deviceToken: null,
};

export const createContactForm = createAsyncThunk(
  'user/createContactForm',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post('/user', data);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message,
        });
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchContactForms = createAsyncThunk(
  'user/fetchContactForms',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/user/get-all-user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'user/deleteContact',
  async (id, {rejectWithValue}) => {
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User delete successfully',
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchUserCountMonth = createAsyncThunk(
  'user/fetchUserCountMonth',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('auth/getUsersAndCount');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createContactForm.pending, state => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createContactForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.contactForm = action.payload;
      })
      .addCase(createContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      .addCase(fetchContactForms.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactForms = action.payload;
      })
      .addCase(fetchContactForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.contactForm = state.contactForm?.filter(
          contact => contact.id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })
      .addCase(fetchUserCountMonth.pending, state => {
        state.isUserCountMonth = true;
        state.error = null;
      })
      .addCase(fetchUserCountMonth.fulfilled, (state, action) => {
        state.isUserCountMonth = false;
        state.userCountMonth = action.payload;
      })
      .addCase(fetchUserCountMonth.rejected, (state, action) => {
        state.isUserCountMonth = false;
        state.error = action.payload;
      });
  },
});
export const {setDeviceToken} = userSlice.actions;
export default userSlice.reducer;
