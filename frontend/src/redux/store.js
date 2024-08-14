import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import memberReducer from './memberSlice';
import loanReducer from './loanSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
    members: memberReducer,
    loans: loanReducer
  },
});

export default store;