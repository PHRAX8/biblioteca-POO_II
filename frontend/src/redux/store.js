import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import memberReducer from './memberSlice';
import loanReducer from './loanSlice';
import persistConfig from './PersistConfig';

const rootReducer = combineReducers({
  users: userReducer,
  books: bookReducer,
  members: memberReducer,
  loans: loanReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
