import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Auth} from '../../src/services';
import axiosInstance from '../../src/services/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  profile: null,
  loading: false,
  error: null,
  signUpUser: [],
  isSignUpUser: false,
  isProfileLoading: false,
  profileDetails: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue, dispatch}) => {
    try {
      const user = await Auth.signIn(email.trim(), password);
      await AsyncStorage.setItem('userUID');
      return user?.user?.uid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (
    {name, email, password, phoneNumber, address},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const user = await Auth.signUp(
        name,
        email,
        password,
        phoneNumber,
        address,
      );
      const firebaseId = user?.user?.uid;

      if (firebaseId) {
        await dispatch(
          saveUserToMongoDB({firebaseId, name, email, phoneNumber, address}),
        ).unwrap();
      }

      return firebaseId;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message,
      });

      return rejectWithValue(error.message);
    }
  },
);
export const saveUserToMongoDB = createAsyncThunk(
  'auth/saveUserToMongoDB',
  async (
    {firebaseId, name, email, phoneNumber, address},
    {rejectWithValue},
  ) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        firebaseId,
        name,
        email,
        phoneNumber,
        address,
      });

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
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId, {rejectWithValue}) => {
    try {
      const profile = await Auth.getCurrentUserProfile(userId);
      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSignUpUser = createAsyncThunk(
  'user/fetchSignUpUser',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/auth/signup');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`/auth/signup/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.put(`/auth/update/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.profile = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(signUpUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSignUpUser.pending, state => {
        state.isSignUpUser = true;
      })
      .addCase(fetchSignUpUser.fulfilled, (state, action) => {
        state.isSignUpUser = false;
        state.signUpUser = action.payload;
      })
      .addCase(fetchSignUpUser.rejected, (state, action) => {
        state.isSignUpUser = false;
      })
      .addCase(fetchProfile.pending, state => {
        state.isProfileLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.profileDetails = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isProfileLoading = false;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
