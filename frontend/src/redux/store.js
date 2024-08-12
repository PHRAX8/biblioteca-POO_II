import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import memberReducer from './memberSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
    members: memberReducer
  },
});

export default store;