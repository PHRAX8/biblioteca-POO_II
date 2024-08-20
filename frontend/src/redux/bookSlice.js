import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
const backendUrl = process.env.BACKENDURI+"";

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(backendUrl+'/api/books');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const deleteBook = createAsyncThunk('books/deleteBook', async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(backendUrl+`/api/books/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const addBook = createAsyncThunk('books/addBook', async (bookData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(backendUrl+'/api/books', bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const updateBook = createAsyncThunk('books/updateBook', async ({ id, bookData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(backendUrl+`/api/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  const bookSlice = createSlice({
    name: 'book',
    initialState: {
      books: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.books = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
          state.books = state.books.filter(book => book._id !== action.payload);
        })
        .addCase(deleteBook.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(addBook.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.books.push(action.payload);
        })
        .addCase(addBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(updateBook.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateBook.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const index = state.books.findIndex(book => book._id === action.payload._id);
          if (index !== -1) {
            state.books[index] = action.payload;
          }
        })
        .addCase(updateBook.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });

export default bookSlice.reducer
