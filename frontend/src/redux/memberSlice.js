import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
const backendUrl = process.env.BACKENDURI;

// Async actions
export const fetchMembers = createAsyncThunk('members/fetchMembers', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(backendUrl+'/api/members');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteMember = createAsyncThunk('members/deleteMember', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(backendUrl+`/api/members/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const addMember = createAsyncThunk('members/addMember', async (memberData, thunkAPI) => {
  try {
    const response = await axiosInstance.post(backendUrl+'/api/members', memberData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updateMember = createAsyncThunk('members/updateMember', async ({ id, memberData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(backendUrl+`/api/members/${id}`, memberData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    members: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(member => member._id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.members.findIndex(member => member._id === action.payload._id);
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
