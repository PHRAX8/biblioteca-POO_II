import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const deleteBook = createAsyncThunk('books/deleteBook', async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const addBook = createAsyncThunk('books/addBook', async (bookData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
  export const updateBook = createAsyncThunk('books/updateBook', async ({ id, bookData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, bookData);
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
