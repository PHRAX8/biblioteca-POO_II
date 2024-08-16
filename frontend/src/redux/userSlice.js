import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from './axiosInstance';

// Async actions
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`http://localhost:5000/api/users/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const addUser = createAsyncThunk('users/addUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`http://localhost:5000/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const loginUser = createAsyncThunk('users/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    // Save the token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('token'); // Remove the token on logout
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Store the logged-in user
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer