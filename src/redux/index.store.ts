import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import chatReducer from './chatReducer/chatReducer.slice';

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

export default configureStore({
  reducer: { chatReducer },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});