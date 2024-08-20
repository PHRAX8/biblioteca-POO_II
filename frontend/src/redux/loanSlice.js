import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
const backendUrl = process.env.REACT_APP_BACK_END_URI+"";

// Thunks para as operações com empréstimos
export const fetchLoans = createAsyncThunk('loans/fetchLoans', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get(backendUrl+'/api/loans');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const deleteLoan = createAsyncThunk('loans/deleteLoan', async (id, thunkAPI) => {
    try {
        await axiosInstance.delete(backendUrl+`/api/loans/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const addLoan = createAsyncThunk('loans/addLoan', async (loanData, thunkAPI) => {
    try {
        const response = await axiosInstance.post(backendUrl+'/api/loans', loanData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const updateLoan = createAsyncThunk('loans/updateLoan', async ({ id, loanData }, thunkAPI) => {
    try {
        const response = await axiosInstance.put(backendUrl+`/api/loans/${id}`, loanData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

// Slice do Redux para empréstimos
const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoans.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoans.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loans = action.payload;
            })
            .addCase(fetchLoans.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteLoan.fulfilled, (state, action) => {
                state.loans = state.loans.filter(loan => loan._id !== action.payload);
            })
            .addCase(deleteLoan.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addLoan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addLoan.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loans.push(action.payload);
            })
            .addCase(addLoan.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateLoan.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLoan.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.loans.findIndex(loan => loan._id === action.payload._id);
                if (index !== -1) {
                    state.loans[index] = action.payload;
                }
            })
            .addCase(updateLoan.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default loanSlice.reducer;
